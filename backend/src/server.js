import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Tes routes
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import dashboardRoutes from './routes/dashboard.js';
import incomesRoutes from './routes/incomes.js';
import expenseRoutes from './routes/expenseRoute.js';
import categoryRoutes from './routes/categoryRoutes.js'; 
import { handleUploadError } from './utils/upload.js';

const app = express();

// Middlewares globaux
app.use(cookieParser());

app.use(cors({ 
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static pour afficher les fichiers uploadés
app.use('/uploads', express.static('uploads')); // ⚠️ vérifie que ton dossier est bien "uploads" en minuscule

// Routes principales
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/incomes', incomesRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/categories', categoryRoutes);

// Middleware de gestion des erreurs Multer (upload)
app.use(handleUploadError);

// Middleware global de gestion d’erreurs
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ message: 'Erreur serveur interne' });
});

// Routes de test / health check
app.get('/api/incomes/test-route', (req, res) => {
  res.json({ message: 'Route test fonctionne' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'running' });
});

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
