import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const expenseController = {
  createExpense: async (req, res) => {
    try {
      const { amount, date, description, type, categoryId, userId, recurring, frequency } = req.body;
      const receipt = req.file ? req.file.filename : null;

      if (!amount || !description || !categoryId) return res.status(400).json({ error: 'Required fields missing' });

      const expenseData = {
        amount: parseFloat(amount),
        date: new Date(date),
        description,
        type,
        receipt,
        categoryId: parseInt(categoryId),
        userId: parseInt(userId),
        recurring: recurring === 'true',
        frequency: recurring === 'true' ? frequency : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const expense = await prisma.expenses.create({ data: expenseData });
      res.status(201).json(expense);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create expense' });
    }
  },

  // Autres méthodes (getAll, getById, update, delete) restent similaires, mais ajoutez receipt handling dans update
  updateExpense: async (req, res) => {
    try {
      const { id } = req.params;
      const { amount, date, description, type, categoryId, userId, recurring, frequency } = req.body;
      const receipt = req.file ? req.file.filename : undefined;

      const expenseData = {
        amount: amount ? parseFloat(amount) : undefined,
        date: date ? new Date(date) : undefined,
        description,
        type,
        receipt,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        userId: userId ? parseInt(userId) : undefined,
        recurring: recurring ? recurring === 'true' : undefined,
        frequency,
        updatedAt: new Date(),
      };

      const expense = await prisma.expenses.update({ where: { id: parseInt(id) }, data: expenseData });
      res.json(expense);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update expense' });
    }
  },

  // ... (autres méthodes comme avant)
};

export default expenseController;