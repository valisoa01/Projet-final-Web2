import express from 'express';
import auth from '../middleware/auth.js';
import upload from '../utils/upload.js';
import { getMe, updateMe } from '../controllers/usersController.js';

const router = express.Router();

router.get('/me', auth, getMe);
router.put('/me', auth, upload.single('profile'), updateMe);

export default router;
