 // routes/incomes.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = express.Router();

// GET /api/incomes
router.get('/', auth, async (req, res) => {
  try {
    // récupère uniquement les revenus de l'utilisateur connecté
    const incomes = await prisma.incomes.findMany({
      where: { userId: req.user.id },
      include: { Users: { select: { id: true, username: true, email: true } } },
    });
    res.json(incomes);
  } catch (error) {
    console.error('Erreur fetching incomes:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des revenus', details: error.message });
  }
});

// POST /api/incomes/new
router.post('/new', auth, async (req, res) => {
  const { amount, date, type, description } = req.body;

  if (!amount || parseFloat(amount) <= 0) 
    return res.status(400).json({ message: 'Le montant doit être positif' });
  if (!date || isNaN(new Date(date).getTime())) 
    return res.status(400).json({ message: 'Date invalide' });

  try {
    const income = await prisma.incomes.create({
      data: {
        amount: parseFloat(amount),
        date: new Date(date),
        type: type || null,
        description: description || null,
        userId: req.user.id, // ✅ récupéré depuis le middleware
      },
    });
    res.status(201).json(income);
  } catch (error) {
    console.error('Erreur création revenu:', error);
    res.status(500).json({ message: 'Erreur serveur', details: error.message });
  }
});

 router.put('/:id/edit', auth, async (req, res) => {
  const { id } = req.params;
  const { amount, date, type, description } = req.body;

  // Vérifications basiques
  if (!amount || parseFloat(amount) <= 0) {
    return res.status(400).json({ message: 'Le montant doit être positif' });
  }
  if (!date || isNaN(new Date(date).getTime())) {
    return res.status(400).json({ message: 'Date invalide' });
  }

  try {
    // Vérifie que l’income appartient bien à l’utilisateur connecté
    const income = await prisma.incomes.findUnique({
      where: { id: parseInt(id) },
    });

    if (!income) {
      return res.status(404).json({ message: 'Revenu non trouvé' });
    }
    if (income.userId !== req.user.id) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    // Mise à jour
    const updatedIncome = await prisma.incomes.update({
      where: { id: parseInt(id) },
      data: {
        amount: parseFloat(amount),
        date: new Date(date),
        type: type || null,
        description: description || null,
      },
    });

    res.json(updatedIncome);
  } catch (error) {
    console.error('Erreur mise à jour revenu:', error);
    res.status(500).json({ message: 'Erreur serveur', details: error.message });
  }
});

// DELETE /api/incomes/:id/delete
router.delete('/:id/delete', auth, async (req, res) => {
  const { id } = req.params;

  try {
    // Vérifie que le revenu existe
    const income = await prisma.incomes.findUnique({
      where: { id: parseInt(id) },
    });

    if (!income) {
      return res.status(404).json({ message: 'Revenu non trouvé' });
    }

    // Vérifie que l’utilisateur connecté est le propriétaire
    if (income.userId !== req.user.id) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    // Supprime le revenu
    await prisma.incomes.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Revenu supprimé avec succès' });
  } catch (error) {
    console.error('Erreur suppression revenu:', error);
    res.status(500).json({ message: 'Erreur serveur', details: error.message });
  }
});


export default router;
