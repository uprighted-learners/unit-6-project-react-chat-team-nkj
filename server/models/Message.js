const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
    {
        when: { type: Date, default: Date.now }, 
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
        body: { type: String, required: true } 
    },
    { timestamps: true } 
);

module.exports = mongoose.model('Message', MessageSchema);