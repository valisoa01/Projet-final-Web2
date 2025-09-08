import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/categories.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json()); 
app.use('/api/auth', authRoutes); 
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));