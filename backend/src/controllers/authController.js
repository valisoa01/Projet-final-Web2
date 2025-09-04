import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
export const upload = multer({ storage }); // Export the upload middleware

// Signup controller
export const signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  const profile = req.file ? req.file.path : null;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: { username, email, password: hashedPassword, profile },
    });
    res.status(201).json({ message: 'User created', userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Email already exists or invalid data' });
  }
};

// Login controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  // Find user by email
  const user = await prisma.users.findUnique({ where: { email } });

  // Validate user and password
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES || '1h' }
  );

  res.json({ token, userId: user.id }); // Return token and userId
};