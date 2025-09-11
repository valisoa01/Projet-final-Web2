 // routes/incomes.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = express.Router();

// ✅ GET /api/incomes avec filtres
router.get('/', auth, async (req, res) => {
  try {
    const { month, year, type, minAmount } = req.query;

    let where = {
      userId: req.user.id, // toujours filtrer par utilisateur connecté
    };

    // 📌 Filtrer par mois + année
    if (month && year) {
      where.date = {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1),
      };
    } else if (year) {
      // 📌 Seulement année
      where.date = {
        gte: new Date(year, 0, 1),
        lt: new Date(Number(year) + 1, 0, 1),
      };
    }

    // 📌 Filtrer par type
    if (type) {
      where.type = type;
    }

    // 📌 Filtrer par montant minimum
    if (minAmount) {
      where.amount = { gte: parseFloat(minAmount) };
    }

    const incomes = await prisma.incomes.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        Users: { select: { id: true, username: true, email: true } },
      },
    });

    res.json(incomes);
  } catch (error) {
    console.error('Erreur fetching incomes:', error);
    res
      .status(500)
      .json({ message: 'Erreur lors de la récupération des revenus', details: error.message });
  }
});

// ✅ POST /api/incomes/new
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
        userId: req.user.id,
      },
    });
    res.status(201).json(income);
  } catch (error) {
    console.error('Erreur création revenu:', error);
    res.status(500).json({ message: 'Erreur serveur', details: error.message });
  }
});

// ✅ PUT /api/incomes/:id/edit
router.put('/:id/edit', auth, async (req, res) => {
  const { id } = req.params;
  const { amount, date, type, description } = req.body;

  if (!amount || parseFloat(amount) <= 0) {
    return res.status(400).json({ message: 'Le montant doit être positif' });
  }
  if (!date || isNaN(new Date(date).getTime())) {
    return res.status(400).json({ message: 'Date invalide' });
  }

  try {
    const income = await prisma.incomes.findUnique({
      where: { id: parseInt(id) },
    });

    if (!income) {
      return res.status(404).json({ message: 'Revenu non trouvé' });
    }
    if (income.userId !== req.user.id) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

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

// ✅ DELETE /api/incomes/:id/delete
router.delete('/:id/delete', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const income = await prisma.incomes.findUnique({
      where: { id: parseInt(id) },
    });

    if (!income) {
      return res.status(404).json({ message: 'Revenu non trouvé' });
    }

    if (income.userId !== req.user.id) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

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
