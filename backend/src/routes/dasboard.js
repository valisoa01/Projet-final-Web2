import express from 'express';
import dashboardController from '../controllers/dasboard.js';

const router = express.Router();

router.get('/stats', dashboardController.getStats);
router.get('/pie-chart', dashboardController.getPieChartData);
router.get('/bar-chart', dashboardController.getBarChartData);

export default router;