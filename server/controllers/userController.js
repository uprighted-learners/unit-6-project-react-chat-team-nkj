const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '4 weeks' });

        res.status(200).json({ token });
    } catch (error) {
        console.log("Login error: ", error)
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    const { id } = req.params; // User ID from the URL
    const { email, password, firstName, lastName } = req.body;

    console.log(id)
    console.log(req.user)

    let foundUser = await User.findById(id)
    console.log(foundUser)

    try {
        // Check if the user is updating their own profile or if the user is an admin
        if (req.user.id !== id && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const updates = {};
        if (firstName) updates.firstName = firstName;
        if (lastName) updates.lastName = lastName;
        if (email) updates.email = email;
        if (password) updates.password = await bcrypt.hash(password, 10);


        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error updating user' });
    }
};
// Delete user 
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the user is deleting their own account or if the user is an admin
        if (req.user.id !== id && !req.user.isAdmin) {
            return res.status(403).json({ error: 'Access denied' });
        }

        await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
};