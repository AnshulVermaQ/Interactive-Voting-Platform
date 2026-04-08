const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');

const jsonmiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: Malformed token" });
    }

    try {
        if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) throw new Error('Invalid JWT_SECRET'); const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: "Invalid token" });
    }
};

const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '15m' }); // 5m means 5 minutes
};

module.exports = { jsonmiddleware, generateToken };
