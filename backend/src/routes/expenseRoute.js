import express from "express";
import auth from "../middleware/auth.js"; // Changé de { authMiddleware } vers auth
import upload, { handleUploadError } from "../utils/upload.js";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";

const router = express.Router();
router.post("/", auth, upload.single("receipt"), createExpense); // Utilisez auth
router.get("/", auth, getExpenses);
router.put("/:id", auth, upload.single("receipt"), updateExpense);
router.delete("/:id", auth, deleteExpense);
router.use(handleUploadError);
export default router;