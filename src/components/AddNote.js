import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import './login.css'

export const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context

    const [note, setNote] = useState({ title: "My Title", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        props.showAlert("success", "Note Added Successfully")
        setNote({ title: "", description: "", tag: "" })
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h2>Add a new note</h2>
            <div id="notebook" className='container my-3'>
                <form id="nform" className='my-3'>
                    <div className="mb-3">
                        {/* <label htmlFor="title" className="form-label">Title</label> */}
                        <input type="text" className="form-control" placeholder='title' id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        {/* <label htmlFor="description" className="form-label">Description</label> */}
                        <textarea rows={6} type="text" className="form-control" placeholder='Start Writing Here...' id="description" name="description" value={note.description} onChange={onchange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        {/* <label htmlFor="tag" className="form-label">Tag</label> */}
                        <input type="text" className="form-control" placeholder='tag' id="tag" name="tag" value={note.tag} onChange={onchange} minLength={5} required/>
                    </div>

                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn" id="AddNotebtn" onClick={handleClick}>Add Note</button>
                </form>
            </div>

        </div>
    )
}
