import express from "express";
import {
  getCategories,
  createCategory,
} from "../controllers/categoryController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Appliquer l'authentification à toutes les routes
router.use(authMiddleware);

// Routes pour les catégories
router.get("/", getCategories);
router.post("/", createCategory);

export default router;