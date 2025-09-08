import express from "express";
import {
  createExpense,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense
} from "../controllers/expenseController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Appliquer l'authentification à toutes les routes
router.use(authMiddleware);

// GET /api/expenses → liste
router.get("/", getExpenses);

// GET /api/expenses/:id → récupérer une dépense
router.get("/:id", getExpense);

// POST /api/expenses → création
router.post("/", createExpense);

// PUT /api/expenses/:id → modification
router.put("/:id", updateExpense);

// DELETE /api/expenses/:id → suppression
router.delete("/:id", deleteExpense);

export default router;