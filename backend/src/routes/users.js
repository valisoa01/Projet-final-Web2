const express = require('express');
const { User } = require('../models');
const auth = require('../middleware/auth');
const upload = require('../utils/upload');
const fs = require('fs');
const path = require('path');


const router = express.Router();


 router.get('/me', auth, async (req, res) => {
const { id, username, email, profileUrl } = req.user;
res.json({ id, username, email, profileUrl });
});


// Update profile (username, email, password, profile photo)
router.put('/me', auth, upload.single('profile'), async (req, res) => {
try {
const user = req.user;
const { username, email, password } = req.body;


if (username) user.username = username;
if (email) user.email = email;


if (password) {
const bcrypt = require('bcrypt');
user.passwordHash = await bcrypt.hash(password, 10);
}


if (req.file) {
// delete old file if exists
if (user.profileUrl) {
const oldPath = path.join(__dirname, '..', '..', user.profileUrl);
if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
}
user.profileUrl = `/uploads/${req.file.filename}`;
}


await user.save();
res.json({ id: user.id, username: user.username, email: user.email, profileUrl: user.profileUrl });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Erreur serveur' });
}
});


module.exports = router;