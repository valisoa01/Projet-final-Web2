import express from 'express';
import { signup, login, logout, upload } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', upload.single('profile'), signup);
router.post('/signin', login);
router.post('/logout', logout);

export default router;