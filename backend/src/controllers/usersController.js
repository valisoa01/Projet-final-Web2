import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

const prisma = new PrismaClient();

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

export const updateMe = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let updateData = {};

    // 1. Validation du Username
    if (username) {
      if (username.length < 3) {
        return res.status(400).json({ message: 'Le nom d\'utilisateur doit contenir au moins 3 caractères' });
      }
      updateData.username = username;
    }

    // 2. Validation de l'Email
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Format d\'email invalide' });
      }
      updateData.email = email;
    }

    // 3. Validation du Password
    if (password) {
      if (password.length < 8) {
        return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères' });
      }
      updateData.password = await bcrypt.hash(password, 10);
    }

    // 4. Gestion de l'Image avec Cloudinary
    if (req.file) {
      // Récupérer l'ancien profil pour nettoyer Cloudinary (optionnel mais recommandé)
      const currentUser = await prisma.users.findUnique({
        where: { id: req.user.id },
        select: { profile: true }
      });

      // Si l'utilisateur avait déjà une image sur Cloudinary, on peut supprimer l'ancienne
      if (currentUser.profile && currentUser.profile.includes('cloudinary')) {
        try {
          // On extrait le public_id de l'URL pour supprimer l'image
          const publicId = currentUser.profile.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(`plan-tracker-profiles/${publicId}`);
        } catch (error) {
          console.error("Erreur suppression ancienne image Cloudinary:", error);
        }
      }

      // req.file.path contient l'URL sécurisée générée par cloudinary-storage
      updateData.profile = req.file.path;
    }

    // 5. Mise à jour dans la base de données
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

 export const deleteMe = async (req, res) => {
  try {
     const user = await prisma.users.findUnique({
      where: { id: req.user.id },
      select: { profile: true }
    });

     if (user.profile) {
      const imagePath = path.join(process.cwd(), user.profile);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

     await prisma.users.delete({
      where: { id: req.user.id }
    });

    res.json({ message: 'Compte supprimé avec succès' });

  } catch (err) {
    console.error('Error in deleteMe:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};