// filepath: server/routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { updateUser } = require('../controllers/userController');
const { isAdmin } = require('../middleware/adminMiddleware');
const { deleteUser } = require('../controllers/userController');

const router = express.Router();

// Register user route
router.post('/register', registerUser);

// Login user route
router.post('/login', loginUser);

// Update user route
router.put('/:id', isAdmin, updateUser);



// Delete user route
router.delete('/:id', isAdmin, deleteUser);


module.exports = router;
