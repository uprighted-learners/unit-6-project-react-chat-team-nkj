const express = require('express');
const router = express.Router();
const Room = require('../models/Room.js');
const { isAdmin } = require('../middleware/adminMiddleware');

router.post('/create', async (req, res) => {
    try {
        const room = new Room(req.body);
        await room.save();
        res.status(201).json(room);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
});

router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.delete('/delete/:id', isAdmin, async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.status(200).send("Room deleted successfully");
    } catch (error) {
        res.status(400).json({ error: error });
    }
});
router.put('/:id', isAdmin, async (req, res) => {
    try {
        await Room.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send("Room updated successfully");
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

module.exports = router;