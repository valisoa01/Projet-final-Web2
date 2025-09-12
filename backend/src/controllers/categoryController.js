import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const categoryId = parseInt(req.params.id);

    const existing = await prisma.categories.findUnique({
      where: { id: categoryId },
      include: { Expenses: true },
    });

    if (!existing || existing.userId !== userId) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Supprimer toutes les dépenses associées à cette catégorie
    if (existing.Expenses.length > 0) {
      await prisma.expenses.deleteMany({
        where: { CategoryId: categoryId },
      });
    }

    // Supprimer la catégorie
    await prisma.categories.delete({
      where: { id: categoryId },
    });

    res.json({ message: "Category and associated expenses deleted successfully" });
  } catch (error) {
    console.error("Erreur suppression catégorie:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
