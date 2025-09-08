import express from 'express';
import multer from 'multer';
import expenseController from '../controllers/expenses.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });  // Dossier pour stocker les receipts

router.get('/', expenseController.getAllExpenses);
router.post('/', upload.single('receipt'), expenseController.createExpense);
router.get('/:id', expenseController.getExpenseById);
router.put('/:id', upload.single('receipt'), expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

export default router;