import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const dashboardController = {
  getStats: async (req, res) => {
    try {
      // Fetch total income
      const totalIncome = await prisma.incomes.aggregate({
        _sum: { amount: true },
      }).then(r => r._sum.amount || 0);

      // Fetch total expenses
      const totalExpenses = await prisma.expenses.aggregate({
        _sum: { amount: true },
      }).then(r => r._sum.amount || 0);

      // Calculate remaining balance
      const remainingBalance = totalIncome - totalExpenses;

      const stats = {
        totalIncome: totalIncome || 0,
        totalExpenses: totalExpenses || 0,
        remainingBalance: remainingBalance || 0,
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch stats' });
    }
  },

  getPieChartData: async (req, res) => {
    try {
      // Group expenses by category
      const categories = await prisma.expenses.groupBy({
        by: ['categoryId'],
        _sum: { amount: true },
      });

      // Fetch category names and join with summed amounts
      const categoryData = await Promise.all(categories.map(async (cat) => {
        const category = await prisma.categories.findUnique({
          where: { id: cat.categoryId || undefined },
        });
        return {
          name: category?.name || 'Unknown',
          amount: cat._sum.amount || 0,
        };
      }));

      const pieChartData = {
        labels: categoryData.map(c => c.name),
        datasets: [{
          data: categoryData.map(c => c.amount),
          backgroundColor: ['#8B5CF6', '#A78BFA', '#C4B5FD', '#7C3AED', '#9F67FA'],
        }],
      };
      res.json(pieChartData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch pie chart data' });
    }
  },

  getBarChartData: async (req, res) => {
  try {
    // Group expenses by month using a raw date truncation
    const monthlyData = await prisma.expenses.groupBy({
      by: ['date'], // Group by the full date first
      _sum: { amount: true },
      orderBy: {
        date: 'asc', // Optional: order by date
      },
    });

    // Process the data to extract month and year
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const barChartData = {
      labels: monthlyData.map(m => {
        const date = new Date(m.date);
        return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      }),
      datasets: [{
        label: 'Monthly Spending',
        data: monthlyData.map(m => m._sum.amount || 0),
        backgroundColor: '#8B5CF6',
      }],
    };
    res.json(barChartData);
  } catch (error) {
    console.error('Bar chart error:', error);
    res.status(500).json({ error: 'Failed to fetch bar chart data' });
  } 
    },
};

export default dashboardController;