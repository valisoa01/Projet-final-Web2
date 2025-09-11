// src/utils/prismaClient.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ✅ exporte en "named export"
export { prisma };
