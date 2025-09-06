import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// GET /me - Récupérer le profil de l'utilisateur connecté
export const getMe = async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        username: true,
        email: true,
        profile: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      profileUrl: user.profile,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (err) {
    console.error('Error in getMe:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// PUT /me - Mettre à jour le profil de l'utilisateur
export const updateMe = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let updateData = {};

    // Validation des données
    if (username) {
      if (username.length < 3) {
        return res.status(400).json({ message: 'Le nom d\'utilisateur doit contenir au moins 3 caractères' });
      }
      updateData.username = username;
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Format d\'email invalide' });
      }
      updateData.email = email;
    }

    if (password) {
      if (password.length < 8) {
        return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères' });
      }
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Gestion de l'image de profil
    if (req.file) {
      // Supprimer l'ancienne image si elle existe
      const currentUser = await prisma.users.findUnique({
        where: { id: req.user.id },
        select: { profile: true }
      });

      if (currentUser.profile) {
        const oldPath = path.join(process.cwd(), currentUser.profile);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      updateData.profile = `/uploads/${req.file.filename}`;
    }

    // Mise à jour de l'utilisateur
    const updatedUser = await prisma.users.update({
      where: { id: req.user.id },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        profile: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json({
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      profileUrl: updatedUser.profile,
      message: 'Profil mis à jour avec succès'
    });

  } catch (err) {
    console.error('Error in updateMe:', err);
    
    if (err.code === 'P2002') {
      const field = err.meta.target.includes('email') ? 'email' : 'username';
      return res.status(400).json({
        message: field === 'email' ? 
          'Cet email est déjà utilisé' : 
          'Ce nom d\'utilisateur est déjà pris'
      });
    }
    
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// DELETE /me - Supprimer le compte utilisateur
export const deleteMe = async (req, res) => {
  try {
    // Récupérer l'utilisateur pour supprimer son image de profil
    const user = await prisma.users.findUnique({
      where: { id: req.user.id },
      select: { profile: true }
    });

    // Supprimer l'image de profil si elle existe
    if (user.profile) {
      const imagePath = path.join(process.cwd(), user.profile);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Supprimer l'utilisateur
    await prisma.users.delete({
      where: { id: req.user.id }
    });

    res.json({ message: 'Compte supprimé avec succès' });

  } catch (err) {
    console.error('Error in deleteMe:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};