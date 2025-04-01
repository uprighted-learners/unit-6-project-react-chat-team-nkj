const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { isAdmin } = require('../middleware/adminMiddleware');

// Get all messages in a room
router.get('/:roomId', async (req, res) => {
    try {
        const messages = await Message.find({ room: req.params.roomId }).populate('user', 'firstName lastName');
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Create a new message in a room
router.post('/:roomId', isAdmin, async (req, res) => {
    try {
        const message = new Message({
            user: req.body.user,
            room: req.params.roomId,
            body: req.body.body
        });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a message
router.put('/:messageId', isAdmin, async (req, res) => {
    try {
        const message = await Message.findById(req.params.messageId);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        message.body = req.body.body || message.body;
        await message.save();
        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a message
router.delete('/:messageId', isAdmin, async (req, res) => {
    try {
        const message = await Message.findById(req.params.messageId);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        await message.remove();
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;