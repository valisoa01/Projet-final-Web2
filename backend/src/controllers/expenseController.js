import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const { description, type, categoryId, date } = req.body;

    const expense = await prisma.expenses.create({
      data: {
        description: description || null,
        type: type || "one-time",
        date: date ? new Date(date) : new Date(),
        userId: userId,
        categoryId: Number(categoryId),
        receipt: req.file?.path || null,
      },
    });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await prisma.expenses.findMany({
      where: { userId: req.user.id },
      include: { Categories: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const expenseId = Number(req.params.id);
    const { description, type, categoryId, date } = req.body;

    const updated = await prisma.expenses.update({
      where: { id: expenseId },
      data: {
        description: description,
        type: type,
        date: date ? new Date(date) : undefined,
        categoryId: Number(categoryId),
        receipt: req.file?.path || undefined,
      },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Erreur mise à jour" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    await prisma.expenses.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur suppression" });
  }
};