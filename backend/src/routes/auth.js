import express from 'express';
import { signup, login, upload } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', upload.single('profile'), signup); // Use multer middleware
router.post('/signin', login);

export default router;