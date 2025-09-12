 import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const incomesController = {
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
          userId: req.user.id, // récupéré via auth middleware
        },
      });

      res.status(201).json(income);
    } catch (error) {
      console.error("Erreur création revenu:", error);
      res.status(500).json({ message: "Erreur serveur", details: error.message });
    }
  },

  // Récupérer tous les revenus avec filtres
  getIncomes: async (req, res) => {
    try {
      const { month, year, type, minAmount, maxAmount } = req.query;

      const filters = {
        userId: req.user.id,
      };

      // ---- Filtre par année ----
      if (year) {
        filters.date = {
          ...(filters.date || {}),
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31T23:59:59`)
        };
      }

      // ---- Filtre par mois ----
      if (month) {
        if (year) {
          // Mois spécifique d’une année donnée
          const start = new Date(year, month - 1, 1);
          const end = new Date(year, month, 0, 23, 59, 59);
          filters.date = { gte: start, lte: end };
        } else {
          // Tous les revenus d’un mois donné (peu importe l’année)
          filters.AND = [
            ...(filters.AND || []),
            {
              date: {
                gte: new Date(2000, month - 1, 1),
              },
            },
            {
              date: {
                lte: new Date(2100, month, 0, 23, 59, 59),
              },
            },
          ];
        }
      }

      // ---- Filtre par type ----
      if (type) {
        filters.type = type;
      }

      // ---- Filtre par montant ----
      if (minAmount || maxAmount) {
        filters.amount = {};
        if (minAmount) filters.amount.gte = parseFloat(minAmount);
        if (maxAmount) filters.amount.lte = parseFloat(maxAmount);
      }

      const incomes = await prisma.incomes.findMany({
        where: filters,
        orderBy: { createdAt: "desc" },
      });

      res.json(incomes);
    } catch (error) {
      console.error("Erreur fetching incomes:", error);
      res.status(500).json({ message: "Erreur serveur", details: error.message });
    }
  },

  // Mettre à jour un revenu
  updateIncome: async (req, res) => {
    try {
      const { id } = req.params;
      const { amount, date, type, description } = req.body;

      if (!amount || parseFloat(amount) <= 0)
        return res.status(400).json({ message: "Le montant doit être positif" });

      if (!date || isNaN(new Date(date).getTime()))
        return res.status(400).json({ message: "Date invalide" });

      const income = await prisma.incomes.update({
        where: { id: parseInt(id) },
        data: {
          amount: parseFloat(amount),
          date: new Date(date),
          type: type || null,
          description: description || null,
        },
      });

      res.json(income);
    } catch (error) {
      console.error("Erreur update revenu:", error);
      res.status(500).json({ message: "Erreur serveur", details: error.message });
    }
  },

  // Supprimer un revenu
  deleteIncome: async (req, res) => {
    try {
      const { id } = req.params;

      await prisma.incomes.delete({
        where: { id: parseInt(id) },
      });

      res.json({ message: "Revenu supprimé avec succès" });
    } catch (error) {
      console.error("Erreur suppression revenu:", error);
      res.status(500).json({ message: "Erreur serveur", details: error.message });
    }
  },
};

export default incomesController;
