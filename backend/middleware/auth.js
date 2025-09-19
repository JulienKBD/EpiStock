const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token)
        return res.status(401).json({msg: 'No token, authorization denied'});

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err)
            return res.status(403).json({msg: 'Token is not valid'});

        req.userId = user.id;
        req.userRole = user.role;
        next();
    });
}

module.exports = authenticateToken;
