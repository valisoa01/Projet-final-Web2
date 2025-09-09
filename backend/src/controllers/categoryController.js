// controllers/categoryController.js
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

// Modifier une catégorie
export const updateCategory = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { name, color } = req.body;

  try {
    // Vérifier que la catégorie appartient à l'utilisateur
    const existingCategory = await prisma.category.findFirst({
      where: { id, userId }
    });

    if (!existingCategory) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }

    const category = await prisma.category.update({
      where: { id },
      data: { name, color },
    });
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une catégorie
export const deleteCategory = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    // Vérifier que la catégorie appartient à l'utilisateur
    const category = await prisma.category.findFirst({
      where: { id, userId }
    });

    if (!category) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }

    await prisma.category.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};