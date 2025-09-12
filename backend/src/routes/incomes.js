 import express from "express";
import auth from "../middleware/auth.js";
import incomesController from "../controllers/IncomesController.js";

const router = express.Router();

router.post("/new", auth, incomesController.createIncome);
router.get("/", auth, incomesController.getIncomes);
router.put("/:id/edit", auth, incomesController.updateIncome);
router.delete("/:id/delete", auth, incomesController.deleteIncome);

export default router;
