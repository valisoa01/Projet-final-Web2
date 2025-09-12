import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

const parseNumber = (v) => (v ? Number(v) : 0);

/**
 * @desc Create expense
 * @route POST /api/expenses
 * @access Private
 */
export const createExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, description, type, categoryId, date } = req.body;

    if (!amount || !categoryId) {
      return res.status(400).json({ message: "Amount and category required" });
    }

    const expense = await prisma.expenses.create({
      data: {
        amount: parseNumber(amount),
        description: description ?? null,
        type: type ?? "one-time",
        date: date ? new Date(date) : new Date(),
        userId, // ✅ corrigé
        categoryId: Number(categoryId), // ✅ corrigé
        receipt: req.file?.path ?? null,
      },
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error("Erreur création dépense:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * @desc Get all expenses
 * @route GET /api/expenses
 * @access Private
 */
export const getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await prisma.expenses.findMany({
      where: { userId }, // ✅ corrigé
      include: { Categories: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(expenses);
  } catch (err) {
    console.error("Erreur récupération dépenses:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Update expense
 * @route PUT /api/expenses/:id
 * @access Private
 */
export const updateExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenseId = Number(req.params.id);

    const existing = await prisma.expenses.findUnique({ where: { id: expenseId } });
    if (!existing || existing.userId !== userId) return res.status(404).json({ message: "Not found" });

    const { amount, description, type, categoryId, date } = req.body;

    const updated = await prisma.expenses.update({
      where: { id: expenseId },
      data: {
        amount: amount ? parseNumber(amount) : existing.amount,
        description: description ?? existing.description,
        type: type ?? existing.type,
        date: date ? new Date(date) : existing.date,
        categoryId: categoryId ? Number(categoryId) : existing.categoryId, // ✅ corrigé
        receipt: req.file?.path ?? existing.receipt,
      },
    });

    res.json(updated);
  } catch (err) {
    console.error("Erreur mise à jour dépense:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenseId = Number(req.params.id);

    const existing = await prisma.expenses.findUnique({ where: { id: expenseId } });
    if (!existing || existing.userId !== userId) return res.status(404).json({ message: "Not found" });

    if (existing.receipt && fs.existsSync(existing.receipt)) fs.unlinkSync(existing.receipt);

    await prisma.expenses.delete({ where: { id: expenseId } });

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Erreur suppression dépense:", err);
    res.status(500).json({ message: "Server error" });
  }
};
