 // routes/incomes.js
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// GET /api/incomes - Récupérer tous les revenus
router.get('/', async (req, res) => {
  try {
    const incomes = await prisma.Incomes.findMany({
      include: {
        Users: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    res.json(incomes);
  } catch (error) {
    console.error('Error fetching incomes:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des revenus', details: error.message });
  }
});

// POST /api/incomes/test - Créer un nouveau revenu
router.post('/test', async (req, res) => {
  try {
    const { amount, date, type, description, UserId } = req.body;

    if (!amount || !date || !UserId) {
      return res.status(400).json({ message: 'Amount, date, and UserId are required' });
    }

    // Vérifie que l'utilisateur existe
    const user = await prisma.Users.findUnique({
      where: { id: Number(UserId) },
    });
    if (!user) {
      return res.status(400).json({ message: 'UserId invalid' });
    }

    // Conversion sécurisée du montant
    const incomeAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    // Création du revenu
    const income = await prisma.Incomes.create({
      data: {
        amount: incomeAmount,
        date: new Date(date),
        type: type || null,
        description: description || null,
        UserId: Number(UserId),
      },
      include: {
        Users: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json(income);
  } catch (error) {
    console.error('Error creating income:', error);
    res.status(500).json({ message: 'Erreur lors de la création du revenu', details: error.message });
  }
});

// PUT /api/incomes/:id - Mettre à jour un revenu
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date, type, description } = req.body;

    const incomeData = {};
    if (amount !== undefined) incomeData.amount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (date) incomeData.date = new Date(date);
    if (type) incomeData.type = type;
    if (description) incomeData.description = description;

    const income = await prisma.Incomes.update({
      where: { id: Number(id) },
      data: incomeData,
      include: {
        Users: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    res.json(income);
  } catch (error) {
    console.error('Error updating income:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du revenu', details: error.message });
  }
});

// DELETE /api/incomes/:id - Supprimer un revenu
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.Incomes.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting income:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du revenu', details: error.message });
  }
});

export default router;
