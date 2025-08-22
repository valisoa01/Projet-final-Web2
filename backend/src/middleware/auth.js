const jwt = require('jsonwebtoken');
const { RevokedToken, User } = require('../models');
require('dotenv').config();


async function authMiddleware(req, res, next) {
try {
const authHeader = req.headers.authorization;
if (!authHeader) return res.status(401).json({ message: 'Token missing' });


const parts = authHeader.split(' ');
if (parts.length !== 2) return res.status(401).json({ message: 'Token format invalid' });


const token = parts[1];

    
 const revoked = await RevokedToken.findOne({ where: { token } });
if (revoked) return res.status(401).json({ message: 'Token revoked' });


const payload = jwt.verify(token, process.env.JWT_SECRET);
const user = await User.findByPk(payload.id);
if (!user) return res.status(401).json({ message: 'Utilisateur introuvable' });


req.user = user;
req.token = token;
next();
} catch (err) {
console.error(err);
return res.status(401).json({ message: 'Authentification échouée' });
}
}


module.exports = authMiddleware;