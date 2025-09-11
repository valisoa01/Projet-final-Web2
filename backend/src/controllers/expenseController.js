// controllers/expenseController.js
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

const parseNumber = (v) => {
  if (v === undefined || v === null || v === "") return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
};

const tryCreateWithAdvancedFields = async (data) => {
  // Essayer la création avec startDate/endDate (si le schema les accepte)
  // Si le modèle Prisma ne contient pas ces champs, Prisma lèvera une erreur qu'on attrapera plus haut.
  return prisma.expenses.create({ data });
};

const tryUpdateWithAdvancedFields = async (id, data) => {
  return prisma.expenses.update({ where: { id }, data });
};

const isBetween = (d, from, to) => {
  if (!d) return false;
  const dd = new Date(d).setHours(0, 0, 0, 0);
  const f = from ? new Date(from).setHours(0, 0, 0, 0) : null;
  const t = to ? new Date(to).setHours(0, 0, 0, 0) : null;
  if (f && t) return dd >= f && dd <= t;
  if (f && !t) return dd >= f;
  if (!f && t) return dd <= t;
  return true;
};

/**
 * Create new expense
 * POST /api/expenses
 */
export const createExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      amount,
      description,
      type = "one-time",
      categoryId,
      date, // used by the "date" schema
      startDate, // used by the "startDate" schema
      endDate,
    } = req.body;

    // validations
    if (!amount || !categoryId) {
      return res.status(400).json({ message: "Amount and categoryId are required" });
    }

    // For one-time expenses we require a date (either date or startDate)
    if (type === "one-time" && !(date || startDate)) {
      return res.status(400).json({ message: "Date is required for one-time expenses" });
    }

    if (type === "recurring" && !(startDate || date)) {
      // we accept 'date' as startDate fallback if schema doesn't have startDate
      return res.status(400).json({ message: "Start date is required for recurring expenses" });
    }

    // receipt handling
    let receiptPath = null;
    if (req.file) {
      receiptPath = req.file.path; // upload middleware must set this
    }

    // Build advanced (preferred) data using startDate/endDate fields
    const advancedData = {
      amount: parseNumber(amount),
      description: description ?? null,
      type,
      startDate: startDate ? new Date(startDate) : date ? new Date(date) : undefined,
      endDate: endDate ? new Date(endDate) : null,
      receipt: receiptPath,
      UserId: userId,
      CategoryId: parseInt(categoryId, 10),
    };

    // remove undefined keys
    Object.keys(advancedData).forEach((k) => advancedData[k] === undefined && delete advancedData[k]);

    // Fallback data if schema only has 'date' field
    const fallbackData = {
      amount: parseNumber(amount),
      description: description ?? null,
      type,
      date: date ? new Date(date) : startDate ? new Date(startDate) : undefined,
      receipt: receiptPath,
      UserId: userId,
      CategoryId: parseInt(categoryId, 10),
    };
    Object.keys(fallbackData).forEach((k) => fallbackData[k] === undefined && delete fallbackData[k]);

    // Try advanced first, if Prisma throws because fields don't exist, fallback
    try {
      const created = await tryCreateWithAdvancedFields(advancedData);
      return res.status(201).json(created);
    } catch (err) {
      // detect unknown-arg / unknown field errors from Prisma
      const msg = String(err?.message || "").toLowerCase();
      if (msg.includes("unknown arg") || msg.includes("unknown field") || msg.includes("startdate") || msg.includes("enddate")) {
        // fallback create using `date`
        try {
          const created = await prisma.expenses.create({ data: fallbackData });
          return res.status(201).json(created);
        } catch (err2) {
          console.error("Fallback create failed:", err2);
          // cleanup uploaded file if any
          if (receiptPath && fs.existsSync(receiptPath)) {
            try { fs.unlinkSync(receiptPath); } catch (e) { /* ignore */ }
          }
          return res.status(500).json({ message: "Server error (fallback)", error: err2.message });
        }
      }
      // other errors
      console.error("Create failed:", err);
      if (receiptPath && fs.existsSync(receiptPath)) {
        try { fs.unlinkSync(receiptPath); } catch (e) { /* ignore */ }
      }
      return res.status(500).json({ message: "Server error", error: err.message });
    }
  } catch (error) {
    console.error("CreateExpense outer error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get all expenses for user
 * GET /api/expenses
 * Optionally you can pass query params like ?month=2025-09 to help filter on server
 */
export const getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    // optional query param to filter by month (YYYY-MM)
    const { month } = req.query;

    const expenses = await prisma.expenses.findMany({
      where: { UserId: userId },
      include: { Categories: true },
      orderBy: { createdAt: "desc" },
    });

    // compute a helper flag `isActiveThisMonth` when possible
    const referenceDate = month ? new Date(`${month}-01`) : new Date();
    const refYear = referenceDate.getFullYear();
    const refMonth = referenceDate.getMonth(); // 0-indexed

    const enriched = expenses.map((e) => {
      // normalize date fields
      const obj = { ...e, isActiveThisMonth: false };

      // handle both schemas:
      // - advanced schema: e.startDate / e.endDate
      // - simple schema: e.date => used for one-time or as startDate for recurring (if no startDate field)
      if (e.type === "recurring") {
        const start = e.startDate ?? e.date ?? null;
        const end = e.endDate ?? null;
        if (start) {
          // check if the reference month lies between start and end
          const startD = new Date(start);
          const endD = end ? new Date(end) : null;

          const startYear = startD.getFullYear();
          const startMonth = startD.getMonth();
          const refStartCompare = new Date(refYear, refMonth, 1).getTime();
          const startCompare = new Date(startYear, startMonth, 1).getTime();
          const endCompare = endD ? new Date(endD.getFullYear(), endD.getMonth(), 1).getTime() : null;

          if (refStartCompare >= startCompare && (endCompare === null || refStartCompare <= endCompare)) {
            obj.isActiveThisMonth = true;
          }
        }
      } else {
        // one-time: check if expense.date belongs to the requested month (if provided)
        const usedDate = e.date ?? null;
        if (usedDate && month) {
          const d = new Date(usedDate);
          obj.isActiveThisMonth = d.getFullYear() === refYear && d.getMonth() === refMonth;
        } else {
          // default: mark as true (present in list)
          obj.isActiveThisMonth = true;
        }
      }
      return obj;
    });

    return res.json(enriched);
  } catch (error) {
    console.error("GetExpenses error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Update expense
 * PUT /api/expenses/:id
 */
export const updateExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenseId = parseInt(req.params.id, 10);

    const existing = await prisma.expenses.findUnique({ where: { id: expenseId } });
    if (!existing || existing.UserId !== userId) {
      return res.status(404).json({ message: "Expense not found or not owned by user" });
    }

    const {
      amount,
      description,
      type,
      categoryId,
      date,
      startDate,
      endDate,
    } = req.body;

    // handle receipt file replacement
    let receiptPath = existing.receipt;
    if (req.file) {
      // remove old file if exists
      if (receiptPath && fs.existsSync(receiptPath)) {
        try { fs.unlinkSync(receiptPath); } catch (e) { /* ignore */ }
      }
      receiptPath = req.file.path;
    }

    const advData = {
      amount: amount ? parseNumber(amount) : existing.amount,
      description: description ?? existing.description,
      type: type ?? existing.type,
      startDate: startDate ? new Date(startDate) : existing.startDate,
      endDate: endDate ? new Date(endDate) : existing.endDate,
      receipt: receiptPath,
      CategoryId: categoryId ? parseInt(categoryId, 10) : existing.CategoryId,
    };
    Object.keys(advData).forEach((k) => advData[k] === undefined && delete advData[k]);

    const fallbackData = {
      amount: amount ? parseNumber(amount) : existing.amount,
      description: description ?? existing.description,
      type: type ?? existing.type,
      date: date ? new Date(date) : existing.date,
      receipt: receiptPath,
      CategoryId: categoryId ? parseInt(categoryId, 10) : existing.CategoryId,
    };
    Object.keys(fallbackData).forEach((k) => fallbackData[k] === undefined && delete fallbackData[k]);

    try {
      const updated = await tryUpdateWithAdvancedFields(expenseId, advData);
      return res.json(updated);
    } catch (err) {
      const msg = String(err?.message || "").toLowerCase();
      if (msg.includes("unknown arg") || msg.includes("unknown field") || msg.includes("startdate") || msg.includes("enddate")) {
        try {
          const updated = await prisma.expenses.update({ where: { id: expenseId }, data: fallbackData });
          return res.json(updated);
        } catch (err2) {
          console.error("Fallback update failed:", err2);
          return res.status(500).json({ message: "Server error (fallback update)", error: err2.message });
        }
      }
      console.error("Update failed:", err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }
  } catch (error) {
    console.error("UpdateExpense outer error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Delete expense
 * DELETE /api/expenses/:id
 */
export const deleteExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenseId = parseInt(req.params.id, 10);

    const existing = await prisma.expenses.findUnique({ where: { id: expenseId } });
    if (!existing || existing.UserId !== userId) {
      return res.status(404).json({ message: "Expense not found or not owned by user" });
    }

    // delete receipt file if present
    if (existing.receipt && fs.existsSync(existing.receipt)) {
      try {
        fs.unlinkSync(existing.receipt);
      } catch (e) {
        console.warn("Could not delete receipt file:", e.message);
      }
    }

    await prisma.expenses.delete({ where: { id: expenseId } });
    return res.json({ message: "Expense deleted" });
  } catch (error) {
    console.error("DeleteExpense error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
