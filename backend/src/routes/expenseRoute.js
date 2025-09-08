import express from "express";
import { createExpense, getExpenses } from "../controllers/expenseController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

// Récupérer toutes les dépenses
router.get("/", getExpenses);

// Créer une dépense
router.post("/", createExpense);

export default router;
