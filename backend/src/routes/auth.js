const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, RevokedToken } = require('../models');
const upload = require('../utils/upload');
require('dotenv').config();

const router = express.Router();

// ================= REGISTER =================
router.post('/register', upload.single('profile'), async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Champs manquants' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Les mots de passe ne correspondent pas' });
        }

        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(409).json({ message: 'Email déjà utilisé' });

        const passwordHash = await bcrypt.hash(password, 10);

        const profileUrl = req.file
            ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
            : null;

        const user = await User.create({
            username,
            email,
            password_hash: passwordHash, // 🔥 cohérence
            profileUrl
        });

        return res.status(201).json({
            id: user.id_user,
            username: user.username,
            email: user.email,
            profileUrl: user.profileUrl
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
});

// ================= LOGIN =================
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Champs manquants' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });

        // ✅ Génération des tokens
        const accessToken = jwt.sign(
            { id: user.id_user },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: process.env.JWT_ACCESS_EXPIRES } // ex: 15m
        );

        const refreshToken = jwt.sign(
            { id: user.id_user },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_REFRESH_EXPIRES } // ex: 30d
        );

        return res.json({
            accessToken,
            refreshToken,
            user: {
                id: user.id_user,
                username: user.username,
                email: user.email,
                profileUrl: user.profileUrl
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
});


// ================= LOGOUT =================
router.post('/logout', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(400).json({ message: 'Token manquant' });

        const token = authHeader.split(' ')[1];
        const payload = jwt.decode(token);

        if (!payload || !payload.exp) {
            return res.status(400).json({ message: 'Token invalide' });
        }

        const expiresAt = new Date(payload.exp * 1000);
        await RevokedToken.create({ token, expiresAt });

        return res.json({ message: 'Déconnecté' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;
