// src/routes/dashboard.js
import express from 'express';
import dashboardController from '../controllers/dashboard.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Protégez toutes les routes dashboard avec l'authentification
router.get('/stats', auth, dashboardController.getStats);
router.get('/pie-chart', auth, dashboardController.getPieChartData);
router.get('/bar-chart', auth, dashboardController.getBarChartData);

export default router;