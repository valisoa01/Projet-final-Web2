import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE
export const createCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, budget } = req.body;

    if (!name || !budget) {
      return res.status(400).json({ message: "Name and budget are required" });
    }

    const category = await prisma.categories.create({
      data: {
        name,
        budget: parseFloat(budget),
        userId,
      },
    });

    res.status(201).json(category);
  } catch (error) {
    console.error("Erreur création catégorie:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// READ
export const getCategories = async (req, res) => {
  try {
    const userId = req.user.id;

    const categories = await prisma.categories.findMany({
      where: { userId },
      include: { Expenses: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(categories);
  } catch (error) {
    console.error("Erreur récupération catégories:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// UPDATE
export const updateCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const categoryId = parseInt(req.params.id, 10);

    if (isNaN(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const existing = await prisma.categories.findUnique({
      where: { id: categoryId },
    });

    if (!existing || existing.userId !== userId) {
      return res.status(404).json({ message: "Category not found" });
    }

    const { name, budget } = req.body;

    const updated = await prisma.categories.update({
      where: { id: categoryId },
      data: {
        name: name ?? existing.name,
        budget: budget ? parseFloat(budget) : existing.budget,
      },
    });

    res.json(updated);
  } catch (error) {
    console.error("Erreur mise à jour catégorie:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    console.log("🟢 req.params:", req.params);
    console.log("🟢 req.user:", req.user);

    const userId = req.user.id;
    const categoryId = parseInt(req.params.id, 10);

    if (isNaN(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const existing = await prisma.categories.findUnique({
      where: { id: categoryId },
      include: { Expenses: true },
    });

    if (!existing || existing.userId !== userId) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (existing.Expenses.length > 0) {
      return res.status(400).json({ message: "Category in use, cannot delete" });
    }

    await prisma.categories.delete({
      where: { id: categoryId },
    });

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Erreur suppression catégorie:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

