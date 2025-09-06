// src/components/Content.jsx
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

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Content = ({ className }) => {
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    remainingBalance: 0,
  });

  const [pieChartData, setPieChartData] = useState({
    labels: ['No expenses yet'],
    datasets: [{
      data: [1],
      backgroundColor: ['#E5E7EB'],
    }],
  });

  const [barChartData, setBarChartData] = useState({
    labels: ['No data'],
    datasets: [{
      label: 'Monthly Spending',
      data: [0],
      backgroundColor: '#E5E7EB',
    }],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [statsResponse, pieResponse, barResponse] = await Promise.all([
          API.get('/api/dashboard/stats'),
          API.get('/api/dashboard/pie-chart'),
          API.get('/api/dashboard/bar-chart'),
        ]);

        // Validate and set stats
        setStats({
          totalIncome: Number(statsResponse.data.totalIncome) || 0,
          totalExpenses: Number(statsResponse.data.totalExpenses) || 0,
          remainingBalance: Number(statsResponse.data.remainingBalance) || 0,
        });

        // Validate and set pie chart data
        if (
          pieResponse.data &&
          Array.isArray(pieResponse.data.labels) &&
          pieResponse.data.labels.length > 0 &&
          pieResponse.data.datasets?.[0]?.data?.length > 0 &&
          pieResponse.data.labels[0] !== 'No expenses yet' &&
          pieResponse.data.labels[0] !== 'Error loading data'
        ) {
          setPieChartData(pieResponse.data);
        } else {
          setPieChartData({
            labels: ['No expenses yet'],
            datasets: [{
              data: [1],
              backgroundColor: ['#E5E7EB'],
            }],
          });
        }

        // Validate and set bar chart data
        if (
          barResponse.data &&
          Array.isArray(barResponse.data.labels) &&
          barResponse.data.labels.length > 0 &&
          barResponse.data.datasets?.[0]?.data?.length > 0 &&
          barResponse.data.labels[0] !== 'No data' &&
          barResponse.data.labels[0] !== 'Error'
        ) {
          setBarChartData(barResponse.data);
        } else {
          setBarChartData({
            labels: ['No data'],
            datasets: [{
              label: 'Monthly Spending',
              data: [0],
              backgroundColor: '#E5E7EB',
            }],
          });
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        let errorMsg = 'Failed to load dashboard data';
        if (err.response?.data?.message === 'Token invalide') {
          errorMsg = 'Session expired. Please sign in again.';
          localStorage.removeItem('token'); // Clear invalid token
        }
        setError(errorMsg);
        setStats({
          totalIncome: 0,
          totalExpenses: 0,
          remainingBalance: 0,
        });
        setPieChartData({
          labels: ['Error loading data'],
          datasets: [{
            data: [1],
            backgroundColor: ['#FECACA'],
          }],
        });
        setBarChartData({
          labels: ['Error'],
          datasets: [{
            label: 'Monthly Spending',
            data: [0],
            backgroundColor: ['#FECACA'],
          }],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className={`p-8 bg-white text-gray-800 w-full max-w-7xl mx-auto ${className}`}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          <p className="ml-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-8 bg-white rounded-lg text-gray-800 w-full max-w-[70%] mx-auto mt-[6vw] ${className}`}>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
          {error.includes('Session expired') && (
            <button
              className="mt-2 text-sm text-purple-600 hover:underline"
              onClick={() => window.location.href = '/signin'}
            >
              Sign in again
            </button>
          )}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-purple-50 p-6 rounded-lg shadow-lg text-center">
          <div className="text-xl font-semibold text-purple-700">Total Income</div>
          <div className="text-3xl mt-2 text-purple-600">
            ${Number(stats.totalIncome).toFixed(2)}
          </div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow-lg text-center">
          <div className="text-xl font-semibold text-purple-700">Total Expenses</div>
          <div className="text-3xl mt-2 text-purple-600">
            ${Number(stats.totalExpenses).toFixed(2)}
          </div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow-lg text-center">
          <div className="text-xl font-semibold text-purple-700">Remaining Balance</div>
          <div className={`text-3xl mt-2 ${stats.remainingBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${Number(stats.remainingBalance).toFixed(2)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-purple-100 p-6 rounded-lg shadow-lg">
          <div className="text-2xl font-semibold text-purple-700 mb-4">
            Expense by Category
            {pieChartData.labels[0] === 'No expenses yet' && (
              <span className="text-sm font-normal text-gray-500 ml-2">(No data yet)</span>
            )}
          </div>
          <div className="h-80 relative">
            <Pie
              data={pieChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: '#4B5563',
                      font: { size: 12 },
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        return `${label}: $${Number(value).toFixed(2)}`;
                      },
                    },
                  },
                },
              }}
            />
            {pieChartData.labels[0] === 'No expenses yet' && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
                <p className="text-gray-500 text-lg">No expenses recorded yet</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-purple-100 p-6 rounded-lg shadow-lg">
          <div className="text-2xl font-semibold text-purple-700 mb-4">
            Monthly Spending
            {barChartData.labels[0] === 'No data' && (
              <span className="text-sm font-normal text-gray-500 ml-2">(No data yet)</span>
            )}
          </div>
          <div className="h-80 relative">
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  x: {
                    ticks: {
                      color: '#4B5563',
                      maxRotation: 45,
                      minRotation: 45,
                    },
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: '#4B5563',
                      callback: (value) => `$${Number(value).toFixed(2)}`,
                    },
                  },
                },
              }}
            />
            {barChartData.labels[0] === 'No data' && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
                <p className="text-gray-500 text-lg">No spending data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {(pieChartData.labels[0] === 'No expenses yet' || barChartData.labels[0] === 'No data') && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Getting Started</h3>
          <p className="text-blue-600">
            Welcome to your dashboard! Start by adding some expenses and incomes to see your financial data visualized here.
          </p>
          <div className="mt-2 space-x-4 bg-amber-500">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => window.location.href = '/add-expense'} // Adjust to your route
            >
              Add Expense
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => window.location.href = '/add-income'} // Adjust to your route
            >
              Add Income
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;