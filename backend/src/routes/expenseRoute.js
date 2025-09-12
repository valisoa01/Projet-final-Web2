import express from "express";
import auth from "../middleware/auth.js";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";
import upload from "../utils/upload.js";

const router = express.Router();

router.post("/", auth, upload.single("receipt"), createExpense);
router.get("/", auth, getExpenses);
router.put("/:id", auth, upload.single("receipt"), updateExpense);
router.delete("/:id", auth, deleteExpense);

export default router;
