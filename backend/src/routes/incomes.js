
import express from "express";
import auth from "../middleware/auth.js";
import incomesController from "../controllers/IncomesController.js";

const router = express.Router();

router.post("/new", auth, incomesController.createIncome);
router.get("/", auth, incomesController.getIncomes);

export default router;
