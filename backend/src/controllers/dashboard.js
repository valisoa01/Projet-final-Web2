// backend/src/controllers/dashboard.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await prisma.expenses.findMany({ where: { userId } });
    const incomes = await prisma.incomes.findMany({ where: { userId } });

    const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const totalIncome = incomes.reduce((sum, i) => sum + Number(i.amount), 0);
    const remainingBalance = totalIncome - totalExpenses;

    res.json({ totalIncome, totalExpenses, remainingBalance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ totalIncome: 0, totalExpenses: 0, remainingBalance: 0 });
  }
};

const getPieChartData = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await prisma.expenses.findMany({ where: { userId }, include: { Categories: true } });

    const categoryMap = {};
    expenses.forEach(e => {
      const cat = e.Categories?.name || "Unknown";
      categoryMap[cat] = (categoryMap[cat] || 0) + Number(e.amount);
    });

    const labels = Object.keys(categoryMap);
    const data = Object.values(categoryMap);

    res.json({
      labels: labels.length ? labels : ["No data"],
      datasets: [{ data: data.length ? data : [1], backgroundColor: ["#8B5CF6", "#A78BFA", "#C4B5FD"] }]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ labels: ["Error"], datasets: [{ data: [1], backgroundColor: ["#FECACA"] }] });
  }
};

const getBarChartData = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await prisma.expenses.findMany({ where: { userId } });

    const monthlyData = {};
    expenses.forEach(e => {
      const date = new Date(e.date);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      monthlyData[key] = (monthlyData[key] || 0) + Number(e.amount);
    });

    const sortedKeys = Object.keys(monthlyData).sort();
    res.json({ labels: sortedKeys, datasets: [{ label: "Monthly Spending", data: sortedKeys.map(k => monthlyData[k]), backgroundColor: "#8B5CF6" }] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ labels: ["Error"], datasets: [{ data: [0], backgroundColor: "#FECACA" }] });
  }
};

export default { getStats, getPieChartData, getBarChartData };
