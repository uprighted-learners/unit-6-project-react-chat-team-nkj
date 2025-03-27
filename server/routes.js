const express = require('express');
const router = express.Router();
const Room = require('./models/Room');

// Create a new room
router.post('/create', async (req, res) => {
    try {
        const room = new Room(req.body);
        await room.save();
        res.status(201).json(room); 
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
});

// Get all rooms
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
});

// Update a room
router.put('/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        Object.assign(room, req.body);
        await room.save();
        res.status(200).json(room);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a room
router.delete('/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        await room.remove();
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;