const User = require('../models/user');
const jwt = require('jsonwebtoken');

console.log(User)

const isAdmin = async (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    let token = req.headers.authorization.split(' ')[1];

    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded.userId)

    const user = await User.findById(decoded.userId).select('-password');
    console.log(user)

    req.user = user;

    try {



        if (!user && !user.isAdmin) {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }
        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports = { isAdmin };