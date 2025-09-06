// src/controllers/auth.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Ensure uploads directory exists
const uploadDir = 'Uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  fs.chmodSync(uploadDir, '755');
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for image uploads
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and GIF files are allowed'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Signup controller
export const signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    const profile = req.file ? req.file.path : null;

    // Validate input
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    // Check if username or email already exists
    const existingUser = await prisma.Users.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
    if (existingUser) {
      return res.status(400).json({
        error: existingUser.email === email ? 'Email already exists' : 'Username already exists',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.Users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        profile,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRES || '7d' }
    );

    return res.status(201).json({
      message: 'User created successfully',
      token,
      userId: user.id,
      username: user.username,
      email: user.email,
      profileUrl: user.profile,
    });
  } catch (err) {
    console.error('Signup error:', err);
    if (err.code === 'P2002') {
      return res.status(400).json({
        error: err.meta.target.includes('email') ? 'Email already exists' : 'Username already exists',
      });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await prisma.Users.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRES || '7d' }
    );

    return res.json({
      token,
      userId: user.id,
      username: user.username,
      email: user.email,
      profileUrl: user.profile,
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Graceful Prisma shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});