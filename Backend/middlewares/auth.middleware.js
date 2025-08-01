const userModel = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isblacklisted = await blackListTokenModel.findOne({ token: token });

    if (isblacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)
        req.user = user; // Attach user to request object
        return next();

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports.authCaptain = async (req, res, next) => {

    const rawToken = req.headers.authorization;
    const tokenFromHeader = rawToken?.startsWith('Bearer ') ? rawToken.split(' ')[1] : null;
    const token = req.cookies.token || tokenFromHeader;

    if (!token || typeof token !== 'string') {
        return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
    }


    const isBlacklisted = await blackListTokenModel.findOne({ token: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain;

        return next()
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' })
    }
}