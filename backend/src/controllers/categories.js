import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await prisma.categories.findMany({
        orderBy: { name: 'asc' },
      });
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  },

  createCategory: async (req, res) => {
    try {
      const { name, budget, userId } = req.body;
      if (!name) return res.status(400).json({ error: 'Name is required' });
      const category = await prisma.categories.create({
        data: {
          name,
          budget: budget ? parseFloat(budget) : undefined,
          UserId: userId ? parseInt(userId) : undefined,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create category' });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, budget } = req.body;
      const category = await prisma.categories.update({
        where: { id: parseInt(id) },
        data: {
          name,
          budget: budget ? parseFloat(budget) : undefined,
          updatedAt: new Date(),
        },
      });
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update category' });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      // Vérifier si la catégorie est utilisée (spec : only if not in use)
      const used = await prisma.expenses.count({ where: { categoryId: parseInt(id) } });
      if (used > 0) return res.status(400).json({ error: 'Category is in use' });
      await prisma.categories.delete({ where: { id: parseInt(id) } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete category' });
    }
  },
};

export default categoryController;