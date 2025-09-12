import express from "express";
import auth from "../middleware/auth.js"; 
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();
router.post("/", auth, createCategory); 
router.get("/", auth, getCategories);
router.put("/:id", auth, updateCategory);
router.delete("/:id", auth, deleteCategory);
export default router;