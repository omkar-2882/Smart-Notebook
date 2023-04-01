const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'OmkarSecret$key'

// ROUTE 1: Create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post('/createuser',
    [
        body('name', 'Enter a valid name').isLength({ min: 5 }),
        body('password', 'Enter a valid password').isLength({ min: 5 }),
        body('email', 'Enter valid email').isEmail(),
    ], async (req, res) => {
        let success = false
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Check whether the user with same email exists already
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exists" })
            }

            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password, salt)

            // Create a new user in databases i.e. add new document(row) in db
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            })
            
            const data = {
                user: { id: user.id }
            }

            const authtoken = jwt.sign(data, JWT_SECRET)
            success=true
            // res.json({ user })
            res.json({ success, authtoken })

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Some error occured")
        }
    })


// ROUTE2: Login a User using: POST: "/api/auth/login" login required
router.post('/login',
    [
        body('email', 'Enter valid email').isEmail(),
        body('password', 'Password cannot be blank').exists(),
    ], async (req, res) => {
        let success = false
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body
        try {
            let user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ error: "Invalid Credentials" })
            }

            const passwordCompare = await bcrypt.compare(password, user.password)

            if (!passwordCompare) {
                return res.status(400).json({ error: "Invalid Credentials" })
            }

            const data = {
                user: {
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET)
            success = true
            res.json({ success, authtoken })

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal error occured")
        }

    })

// ROUTE 3: Get logged in user details using POST: "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id
        let user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal error occured")
    }
})


module.exports = router
