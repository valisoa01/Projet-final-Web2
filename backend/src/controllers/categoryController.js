import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @desc Create category
 * @route POST /api/categories
 * @access Private
 */
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
        UserId: userId,
      },
    });

    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Get all categories
 * @route GET /api/categories
 * @access Private
 */
export const getCategories = async (req, res) => {
  try {
    const userId = req.user.id;

    const categories = await prisma.categories.findMany({
      where: { UserId: userId },
      // include: { Expenses: true },
    });

    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Update category
 * @route PUT /api/categories/:id
 * @access Private
 */
export const updateCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const categoryId = parseInt(req.params.id);

    const existing = await prisma.categories.findUnique({
      where: { id: categoryId },
    });

    if (!existing || existing.UserId !== userId) {
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
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Delete category
 * @route DELETE /api/categories/:id
 * @access Private
 */
export const deleteCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const categoryId = parseInt(req.params.id);

    const existing = await prisma.categories.findUnique({
      where: { id: categoryId },
      include: { Expenses: true },
    });

    if (!existing || existing.UserId !== userId) {
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
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
