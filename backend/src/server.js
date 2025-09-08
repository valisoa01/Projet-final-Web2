import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import dashboardRoutes from './routes/dashboard.js'; 
import { handleUploadError } from './utils/upload.js';

const app = express();

 app.use(cors({ 
  origin: 'http://localhost:5173',
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/dashboard', dashboardRoutes); 

 app.use(handleUploadError);

 app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ message: 'Erreur serveur interne' });
});

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));