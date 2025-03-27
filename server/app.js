// filepath: server/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes.js');
const roomRoutes = require('./routes/roomRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js')
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB



mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/rooms',roomRoutes);
app.use('/api/messages',messageRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));