import React from 'react';
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

// Register Chart.js components
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Content = () => {
  // Static data for stats and charts
  const stats = {
    totalIncome: 5000,
    totalExpenses: 3000,
    remainingBalance: 2000,
  };

  const pieChartData = {
    labels: ['Food', 'Travel', 'Other'],
    datasets: [{
      data: [1000, 1500, 500],
      backgroundColor: ['#8B5CF6', '#A78BFA', '#C4B5FD'],
      hoverBackgroundColor: ['#7C3AED', '#9F67FA', '#B3A0FD'],
      borderWidth: 1,
      borderColor: '#fff',
    }],
  };

  const barChartData = {
    labels: ['Aug 2025', 'Sep 2025'],
    datasets: [{
      label: 'Monthly Spending',
      data: [2500, 3000],
      backgroundColor: '#8B5CF6',
      hoverBackgroundColor: '#7C3AED',
      borderRadius: 8,
    }],
  };

  return (
    <div className="p-8 bg-white text-gray-800 w-full max-w-7xl mx-auto">
      {/* Alert */}
      <div className="bg-red-500 rounded-lg shadow-lg mb-8 hidden" id="alert">
        <div className="text-xl font-bold text-white p-4">
          You've exceeded your monthly budget by $111.47.
        </div>
      </div>

      {/* Filters */}
      <div className="bg-purple-100 p-6 rounded-lg shadow-lg mb-8">
        <div className="text-2xl font-semibold mb-4 text-purple-700">
          Filtre tes Dépenses
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <input
            type="month"
            defaultValue={new Date().toISOString().slice(0, 7)}
            className="p-4 rounded-lg bg-white text-purple-700 text-lg border border-purple-300 focus:ring-2 focus:ring-purple-500 w-full md:w-1/3"
          />
          <select className="p-4 rounded-lg bg-white text-purple-700 text-lg border border-purple-300 focus:ring-2 focus:ring-purple-500 w-full md:w-1/3">
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-purple-50 p-6 rounded-lg shadow-lg text-center">
          <div className="text-xl font-semibold text-purple-700">Total Income</div>
          <div className="text-3xl mt-2 text-purple-600">
            ${stats.totalIncome.toFixed(2)}
          </div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow-lg text-center">
          <div className="text-xl font-semibold text-purple-700">Total Expenses</div>
          <div className="text-3xl mt-2 text-purple-600">
            ${stats.totalExpenses.toFixed(2)}
          </div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow-lg text-center">
          <div className="text-xl font-semibold text-purple-700">Remaining Balance</div>
          <div className="text-3xl mt-2 text-green-600">
            ${stats.remainingBalance.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-purple-100 p-6 rounded-lg shadow-lg">
          <div className="text-2xl font-semibold text-purple-700 mb-4">
            Expense by Category
          </div>
          <div className="h-80">
            <Pie
              data={pieChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { color: '#4B5563', font: { size: 14 } },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-purple-100 p-6 rounded-lg shadow-lg">
          <div className="text-2xl font-semibold text-purple-700 mb-4">
            Monthly Spending Over Time
          </div>
          <div className="h-80">
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { ticks: { color: '#4B5563' } },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: '#4B5563',
                      callback: (value) => `$${value}`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;