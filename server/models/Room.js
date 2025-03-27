const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        addedUsers: [{ type: String }] 
    },
    { timestamps: true } 
);

module.exports = mongoose.model('Room', RoomSchema);