import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const IncomesController = {
  // Créer un revenu
  createIncome: async (req, res) => {
    try {
      const { amount, date, type, description } = req.body;
      if (!amount || parseFloat(amount) <= 0)
        return res.status(400).json({ message: "Le montant doit être positif" });
      if (!date || isNaN(new Date(date).getTime()))
        return res.status(400).json({ message: "Date invalide" });

      const income = await prisma.incomes.create({
        data: {
          amount: parseFloat(amount),
          date: new Date(date),
          type: type || null,
          description: description || null,
          userId: req.user.id,  // important : correspond à ton utilisateur connecté
        },
      });

      res.status(201).json(income);
    } catch (error) {
      console.error("Erreur création revenu:", error);
      res.status(500).json({ message: "Erreur serveur", details: error.message });
    }
  },

  // Lister les revenus
  getIncomes: async (req, res) => {
    try {
      const incomes = await prisma.incomes.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: "desc" },
      });
      res.json(incomes);
    } catch (error) {
      console.error("Erreur fetching incomes:", error);
      res.status(500).json({ message: "Erreur serveur", details: error.message });
    }
  },
};

export default IncomesController;
