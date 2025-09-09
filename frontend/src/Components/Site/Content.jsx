import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import API from '../../api/axios';
import { CreditCard, DollarSign, PieChart, Calendar } from 'lucide-react';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Content = ({ className }) => {
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    remainingBalance: 0,
  });

  const [pieChartData, setPieChartData] = useState({
    labels: ['No expenses yet'],
    datasets: [{ data: [1], backgroundColor: ['#E5E7EB'] }],
  });

  const [barChartData, setBarChartData] = useState({
    labels: ['No data'],
    datasets: [{ label: 'Monthly Spending', data: [0], backgroundColor: '#E5E7EB' }],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const months = [
    { value: 1, label: 'January' }, { value: 2, label: 'February' },
    { value: 3, label: 'March' }, { value: 4, label: 'April' },
    { value: 5, label: 'May' }, { value: 6, label: 'June' },
    { value: 7, label: 'July' }, { value: 8, label: 'August' },
    { value: 9, label: 'September' }, { value: 10, label: 'October' },
    { value: 11, label: 'November' }, { value: 12, label: 'December' },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsResponse, pieResponse, barResponse] = await Promise.all([
          API.get(`/api/dashboard/stats?month=${selectedMonth}`),
          API.get(`/api/dashboard/pie-chart?month=${selectedMonth}`),
          API.get(`/api/dashboard/bar-chart?month=${selectedMonth}`),
        ]);

        setStats({
          totalIncome: Number(statsResponse.data.totalIncome) || 0,
          totalExpenses: Number(statsResponse.data.totalExpenses) || 0,
          remainingBalance: Number(statsResponse.data.remainingBalance) || 0,
        });

        if (pieResponse.data?.labels?.length > 0 && pieResponse.data.datasets?.[0]?.data?.length > 0) {
          const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F472B6'];
          setPieChartData({
            labels: pieResponse.data.labels,
            datasets: [{ data: pieResponse.data.datasets[0].data, backgroundColor: colors.slice(0, pieResponse.data.labels.length) }]
          });
        } else {
          setPieChartData({ labels: ['No expenses yet'], datasets: [{ data: [1], backgroundColor: ['#E5E7EB'] }] });
        }

        if (barResponse.data?.labels?.length > 0 && barResponse.data.datasets?.[0]?.data?.length > 0) {
          const barColors = barResponse.data.datasets[0].data.map(value =>
            value >= 0 ? '#3B82F6' : '#EF4444'
          );
          setBarChartData({
            labels: barResponse.data.labels,
            datasets: [{ label: 'Monthly Spending', data: barResponse.data.datasets[0].data, backgroundColor: barColors }]
          });
        } else {
          setBarChartData({ labels: ['No data'], datasets: [{ label: 'Monthly Spending', data: [0], backgroundColor: '#E5E7EB' }] });
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [selectedMonth]);

  if (loading) {
    return (
      <div className={`p-4 w-full ${className}`}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          <p className="ml-4 text-gray-600 dark:text-gray-300">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 w-full flex flex-col gap-6 ${className}`}>

      {error && (
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Month filter */}
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-5 h-5 text-cyan-500"/>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white hover:border-cyan-500 focus:ring-1 focus:ring-cyan-400 transition-all"
        >
          {months.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </div>

      {/* Clickable summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => window.location.href = '/incomes'}
          className="cursor-pointer bg-green-50 dark:bg-green-900 hover:bg-green-100 dark:hover:bg-green-800 p-6 rounded-xl shadow-lg flex flex-col items-center transition-transform transform hover:scale-105 min-h-[140px]"
        >
          <DollarSign className="w-10 h-10 text-green-500 mb-2"/>
          <span className="text-gray-700 dark:text-white font-semibold">Income</span>
          <span className="text-2xl font-bold text-green-600 mt-1">${stats.totalIncome.toFixed(2)}</span>
        </div>

        <div
          onClick={() => window.location.href = '/expenses'}
          className="cursor-pointer bg-red-50 dark:bg-red-900 hover:bg-red-100 dark:hover:bg-red-800 p-6 rounded-xl shadow-lg flex flex-col items-center transition-transform transform hover:scale-105 min-h-[140px]"
        >
          <CreditCard className="w-10 h-10 text-red-500 mb-2"/>
          <span className="text-gray-700 dark:text-white font-semibold">Expenses</span>
          <span className="text-2xl font-bold text-red-600 mt-1">${stats.totalExpenses.toFixed(2)}</span>
        </div>

        <div
          onClick={() => window.location.href = '/dashboard'}
          className="cursor-pointer bg-yellow-50 dark:bg-yellow-900 hover:bg-yellow-100 dark:hover:bg-yellow-800 p-6 rounded-xl shadow-lg flex flex-col items-center transition-transform transform hover:scale-105 min-h-[140px]"
        >
          <PieChart className="w-10 h-10 text-yellow-500 mb-2"/>
          <span className="text-gray-700 dark:text-white font-semibold">Balance</span>
          <span className={`text-2xl font-bold mt-1 ${stats.remainingBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${stats.remainingBalance.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Expense by Category</div>
          <div className="h-80 bg-white rounded-xl p-2">
            <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Monthly Spending</div>
          <div className="h-80 bg-white rounded-xl p-2">
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
