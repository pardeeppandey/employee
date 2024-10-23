const express = require('express');
// const bcrypt = require('bcrypt');
const User = require('../models/Users');
const router = express.Router();

// Admin sign-up (one-time)
router.post('/signup', async (req, res) => {
    const { username, password, role,employeeId } = req.body;

    try {
        // const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password, role,employeeId });
        await newUser.save();
        res.status(201).json({ message: 'Employee registered successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error creating admin', error: err });
    }
});

// User login (both admin and employee)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // const isPasswordValid = await bcrypt.compare(password, user.password);
        if (password !== user.password) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // If login is successful, send back user details
        res.status(200).json({ message: 'Login successful', user: { id:user.employeeId, username: user.username, role: user.role } });
    } catch (err) {
        res.status(400).json({ message: 'Error logging in', error: err });
    }
});

module.exports = router;
