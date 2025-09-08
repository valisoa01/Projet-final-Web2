// server.js
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import dashboardRoutes from './routes/dashboard.js';
import expenseRoutes from './routes/expenseRoute.js'; // 👈 ajouté
import { handleUploadError } from './utils/upload.js';
import expenseRoutes from './routes/expenseRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
const app = express();

// Configuration CORS
app.use(cors({ 
  origin: 'http://localhost:5173',
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/expenses', expenseRoutes); // 👈 ajouté
app.use('/api/categories', categoryRoutes);// Middleware de gestion d'erreurs
app.use(handleUploadError);

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ message: 'Erreur serveur interne' });
});

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
