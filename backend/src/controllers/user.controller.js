import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// GET /me
export const getMe = async (req, res) => {
  try {
    const { id, username, email, profileUrl } = req.user;
    res.json({ id, username, email, profileUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// PUT /me
export const updateMe = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let updateData = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    if (req.file) {
      if (req.user.profileUrl) {
        const oldPath = path.join(process.cwd(), req.user.profileUrl);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updateData.profileUrl = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await prisma.users.update({
      where: { id: req.user.id },
      data: updateData,
    });

    res.json({
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      profileUrl: updatedUser.profileUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
