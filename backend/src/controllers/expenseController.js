// controllers/expenseController.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Récupérer toutes les dépenses
export const getExpenses = async (req, res) => {
  const userId = req.user.id;
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { date: 'desc' }
    });
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Créer une dépense
export const createExpense = async (req, res) => {
  console.log("Requête reçue:", req.body);
  const { amount, date, categoryId, description, type, recurrence, startDate, endDate } = req.body;
  const userId = req.user.id;

  try {
    // Validation des données
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Le montant doit être positif" });
    }
    
    if (!categoryId) {
      return res.status(400).json({ error: "La catégorie est requise" });
    }

    // Validation des dates pour les dépenses récurrentes
    if (type === "recurring") {
      if (!recurrence) {
        return res.status(400).json({ error: "La fréquence est requise pour les dépenses récurrentes" });
      }
      if (!startDate) {
        return res.status(400).json({ error: "La date de début est requise pour les dépenses récurrentes" });
      }
      if (endDate && new Date(endDate) <= new Date(startDate)) {
        return res.status(400).json({ error: "La date de fin doit être après la date de début" });
      }
    }

    const expense = await prisma.expense.create({
      data: {
        amount: parseFloat(amount),
        date: new Date(date),
        description,
        type: type || "one-time",
        recurrence: type === "recurring" ? recurrence : null,
        startDate: type === "recurring" ? new Date(startDate) : null,
        endDate: type === "recurring" && endDate ? new Date(endDate) : null,
        categoryId,
        userId,
      },
      include: { category: true },
    });
    
    console.log("Dépense créée avec succès:", expense);
    res.status(201).json(expense);
  } catch (error) {
    console.error("Erreur dans createExpense:", error);
    res.status(400).json({ error: error.message });
  }
};