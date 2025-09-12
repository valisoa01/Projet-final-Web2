 import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Récupération des statistiques principales : total income, total expenses, remaining balance
 */
const getStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Récupération simultanée des revenus et dépenses
    const [expenses, incomes] = await Promise.all([
      prisma.expenses.findMany({ where: { userId } }),
      prisma.incomes.findMany({ where: { userId } })
    ]);

    // Calcul des totaux
    const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const totalIncome = incomes.reduce((sum, i) => sum + Number(i.amount), 0);
    const remainingBalance = totalIncome - totalExpenses;

    // Retour des données
    res.json({
      totalIncome: totalIncome.toFixed(2),
      totalExpenses: totalExpenses.toFixed(2),
      remainingBalance: remainingBalance.toFixed(2)
    });
  } catch (err) {
    console.error("Error in getStats:", err);
    res.status(500).json({ totalIncome: "0.00", totalExpenses: "0.00", remainingBalance: "0.00" });
  }
};

/**
 * Récupération des données pour le graphique en camembert (par catégorie)
 */
const getPieChartData = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await prisma.expenses.findMany({
      where: { userId },
      include: { Categories: true }
    });

    const categoryMap = {};
    expenses.forEach(e => {
      const categoryName = e.Categories?.name || "Unknown";
      categoryMap[categoryName] = (categoryMap[categoryName] || 0) + Number(e.amount);
    });

    const labels = Object.keys(categoryMap);
    const data = Object.values(categoryMap);

    res.json({
      labels: labels.length ? labels : ["No data"],
      datasets: [{
        data: data.length ? data : [1],
        backgroundColor: ["#8B5CF6", "#A78BFA", "#C4B5FD", "#4F46E5", "#60A5FA"]
      }]
    });
  } catch (err) {
    console.error("Error in getPieChartData:", err);
    res.status(500).json({
      labels: ["Error"],
      datasets: [{ data: [1], backgroundColor: ["#FECACA"] }]
    });
  }
};

/**
 * Récupération des données pour le graphique en barres (dépenses mensuelles)
 */
const getBarChartData = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await prisma.expenses.findMany({ where: { userId } });

    const monthlyData = {};
    expenses.forEach(e => {
      const date = new Date(e.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      monthlyData[key] = (monthlyData[key] || 0) + Number(e.amount);
    });

    const sortedKeys = Object.keys(monthlyData).sort();
    res.json({
      labels: sortedKeys.length ? sortedKeys : ["No data"],
      datasets: [{
        label: "Monthly Spending",
        data: sortedKeys.map(k => monthlyData[k]),
        backgroundColor: "#8B5CF6"
      }]
    });
  } catch (err) {
    console.error("Error in getBarChartData:", err);
    res.status(500).json({
      labels: ["Error"],
      datasets: [{ data: [0], backgroundColor: "#FECACA" }]
    });
  }
};

export default { getStats, getPieChartData, getBarChartData };
