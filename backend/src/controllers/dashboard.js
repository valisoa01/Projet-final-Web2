// src/controllers/dashboard.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const dashboardController = {
  getStats: async (req, res) => {
    try {
      const userId = req.user.id;

      // Fetch total income for the logged-in user
      const totalIncome = await prisma.incomes.aggregate({
        where: { UserId: userId },
        _sum: { amount: true },
      }).then(r => Number(r._sum.amount) || 0);

      // Fetch total expenses for the logged-in user
      const totalExpenses = await prisma.expenses.aggregate({
        where: { UserId: userId },
        _sum: { amount: true },
      }).then(r => Number(r._sum.amount) || 0);

      // Calculate remaining balance
      const remainingBalance = totalIncome - totalExpenses;

      const stats = {
        totalIncome,
        totalExpenses,
        remainingBalance,
      };
      res.json(stats);
    } catch (error) {
      console.error('Stats error:', error);
      res.status(500).json({
        error: 'Failed to fetch stats',
        stats: { totalIncome: 0, totalExpenses: 0, remainingBalance: 0 },
      });
    }
  },

  getPieChartData: async (req, res) => {
    try {
      const userId = req.user.id;

      // Fetch expenses with their categories using select
      const expensesWithCategories = await prisma.expenses.findMany({
        where: { UserId: userId },
        select: {
          amount: true,
          Categories: {
            select: {
              name: true,
            },
          },
        },
      });

      // Group and sum amounts by category name in JavaScript
      const categoryMap = {};
      expensesWithCategories.forEach(expense => {
        const categoryName = expense.Categories?.name || 'Unknown';
        if (!categoryMap[categoryName]) {
          categoryMap[categoryName] = 0;
        }
        categoryMap[categoryName] += Number(expense.amount);
      });

      const categoryData = Object.entries(categoryMap)
        .map(([name, amount]) => ({
          name,
          amount,
        }))
        .filter(c => c.amount > 0); // Exclude categories with zero amount

      const pieChartData = {
        labels: categoryData.length > 0 ? categoryData.map(c => c.name) : ['No expenses yet'],
        datasets: [{
          data: categoryData.length > 0 ? categoryData.map(c => c.amount) : [1],
          backgroundColor: categoryData.length > 0
            ? ['#8B5CF6', '#A78BFA', '#C4B5FD', '#7C3AED', '#9F67FA']
            : ['#E5E7EB'],
        }],
      };
      res.json(pieChartData);
    } catch (error) {
      console.error('Pie chart error:', error);
      res.status(500).json({
        error: 'Failed to fetch pie chart data',
        labels: ['Error loading data'],
        datasets: [{ data: [1], backgroundColor: ['#FECACA'] }],
      });
    }
  },

  getBarChartData: async (req, res) => {
    try {
      const userId = req.user.id;

      // Get expenses for the last 6 months for the logged-in user
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const expenses = await prisma.expenses.findMany({
        where: {
          UserId: userId,
          date: {
            gte: sixMonthsAgo,
          },
        },
        orderBy: {
          date: 'asc',
        },
      });

      // Group by month
      const monthlyData = {};
      expenses.forEach(expense => {
        const date = new Date(expense.date);
        const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
        if (!monthlyData[monthYear]) {
          monthlyData[monthYear] = 0;
        }
        monthlyData[monthYear] += Number(expense.amount);
      });

      // Format for chart
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const sortedMonths = Object.keys(monthlyData).sort();

      const barChartData = {
        labels: sortedMonths.length > 0
          ? sortedMonths.map(month => {
              const [year, monthNum] = month.split('-');
              return `${monthNames[parseInt(monthNum) - 1]} ${year}`;
            })
          : ['No data'],
        datasets: [{
          label: 'Monthly Spending',
          data: sortedMonths.length > 0 ? sortedMonths.map(month => monthlyData[month]) : [0],
          backgroundColor: '#8B5CF6',
        }],
      };
      res.json(barChartData);
    } catch (error) {
      console.error('Bar chart error:', error);
      res.status(500).json({
        error: 'Failed to fetch bar chart data',
        labels: ['Error'],
        datasets: [{ label: 'Monthly Spending', data: [0], backgroundColor: '#FECACA' }],
      });
    }
  },
};

export default dashboardController;