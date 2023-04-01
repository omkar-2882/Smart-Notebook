const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator')
const router = express.Router();
const Note = require('../models/Note')

// ROUTE 1: Get all notes using: GET "/api/notes/getallnotes". Login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json({ notes })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }
})


// ROUTE 2: Add a new note: GET "/api/notes/addnote". Login required

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid name').isLength({ min: 3 }),
    body('description', 'Enter a valid password').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save()

        res.json({ savedNote })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }
})


// ROUTE 3: update a new note: GET "/api/notes/updatenote". Login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body
    try {
        // Create newNote object
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Note Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

        res.json({ note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }

})


// ROUTE 4: Delete a new note: GET "/api/notes/deletenote". Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        // Allow Deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Note Allowed")
        }
        
        note = await Note.findByIdAndDelete(req.params.id)

        res.json({ "Success": "Note has been deleted", "Note": note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }
})


module.exports = router
