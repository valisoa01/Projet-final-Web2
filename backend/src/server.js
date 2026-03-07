import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Import des routes
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

const allowedOrigins = [
  'http://localhost:5173',
  'http://192.168.1.66:5173',
  'https://projet-final-web2-aps.vercel.app'
];

 app.use(cors({ 
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200 // Pour les navigateurs plus anciens
}));

// Important : Gérer explicitement les requêtes OPTIONS
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true
}));
// --- MIDDLEWARES ---
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- FICHIERS STATIQUES ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- ROUTES API ---
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/incomes', incomesRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/categories', categoryRoutes);

// --- GESTION DES ERREURS ---
app.use(handleUploadError);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// --- DÉMARRAGE DU SERVEUR ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});