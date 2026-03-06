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

// --- CONFIGURATION CORS AMÉLIORÉE ---
const allowedOrigins = [
  'http://localhost:5173',
  'https://projet-final-web2.vercel.app',
  'https://projet-final-web2-wefb.vercel.app'
];

app.use(cors({ 
  origin: function (origin, callback) {
    // Autorise les requêtes sans origine (comme Postman) ou les origines listées
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS Error: Origin ${origin} not allowed`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200
}));

// --- MIDDLEWARES DE BASE ---
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- FICHIERS STATIQUES ---
// Assure-toi que le dossier 'uploads' existe à la racine
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- ROUTES API ---
// Note : Tes appels frontend doivent impérativement commencer par /api
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/incomes', incomesRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/categories', categoryRoutes);

// --- GESTION DES ERREURS ---
app.use(handleUploadError);

// Health Check (Utile pour Render)
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Server is running',
    environment: process.env.NODE_ENV 
  });
});

// --- DÉMARRAGE DU SERVEUR ---
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🚀 Environment: ${process.env.NODE_ENV}`);
});

server.keepAliveTimeout = 120000; 
server.headersTimeout = 125000;