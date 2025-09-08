import express from 'express';
import dashboardController from '../controllers/dashboard.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', auth, dashboardController.getStats);
router.get('/pie-chart', auth, dashboardController.getPieChartData);
router.get('/bar-chart', auth, dashboardController.getBarChartData);

export default router;