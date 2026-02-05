import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Tes routes
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import dashboardRoutes from './routes/dashboard.js';
import incomesRoutes from './routes/incomes.js';
import expenseRoutes from './routes/expenseRoute.js';
import categoryRoutes from './routes/categoryRoutes.js'; 
import { handleUploadError } from './utils/upload.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURATION CORS (CORRECTION CRUCIALE) ---
const allowedOrigins = [
  'http://localhost:5173',
  'https://projet-final-web2-wefb.vercel.app', // Ton URL d'image image_cc43c6.jpg
  'https://projet-final-web2.vercel.app'
];

app.use(cors({ 
  origin: function (origin, callback) {
    // Permet les requêtes sans origine (comme Postman) ou les origines autorisées
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("CORS Bloqué pour l'origine:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static pour afficher les fichiers uploadés (Utilise path.join pour être sûr)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes principales
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/incomes', incomesRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/categories', categoryRoutes);

app.use(handleUploadError);

// Health check (Très utile pour réveiller Render)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is live' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));