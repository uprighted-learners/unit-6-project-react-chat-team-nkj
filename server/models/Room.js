
const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema(
    {
        "name": "Continental",
        "description": "No business conducted",
        "addedUsers": ["John Wick", "Winston", "Ms. Perkins"]
    })

    module.exports = mongoose.model('Room', RoomSchema);