import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Récupérer toutes les catégories de l'utilisateur
export const getCategories = async (req, res) => {
  const userId = req.user.id;
  try {
    const categories = await prisma.category.findMany({
      where: { userId },
      orderBy: { name: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Créer une nouvelle catégorie
export const createCategory = async (req, res) => {
  const userId = req.user.id;
  const { name, color } = req.body;

  try {
    // Validation
    if (!name) {
      return res.status(400).json({ error: "Le nom de la catégorie est requis" });
    }

    const category = await prisma.category.create({
      data: {
        name,
        color: color || "#3B82F6",
        userId,
      },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};