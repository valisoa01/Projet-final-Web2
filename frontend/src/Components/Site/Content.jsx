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

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Content = ({ className }) => {
  const [stats, setStats] = useState({ totalIncome: 0, totalExpenses: 0, remainingBalance: 0 });
  const [pieChartData, setPieChartData] = useState({ labels: [], datasets: [{ data: [], backgroundColor: [] }] });
  const [barChartData, setBarChartData] = useState({ labels: [], datasets: [{ data: [], backgroundColor: '' }] });

  useEffect(() => {
    // Fetch data from backend
    fetch('http://localhost:5000/api/dashboard/stats')
      .then((res) => res.json())
      .then((data) => setStats(data));

    fetch('http://localhost:5000/api/dashboard/pie-chart')
      .then((res) => res.json())
      .then((data) => setPieChartData(data));

    fetch('http://localhost:5000/api/dashboard/bar-chart')
      .then((res) => res.json())
      .then((data) => setBarChartData(data));
  }, []);

  return (
    <div className={`p-8 bg-white text-gray-800 w-full max-w-7xl mx-auto ${className}`}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-purple-50 p-6 rounded-lg shadow-lg text-center">
          <div className="text-xl font-semibold text-purple-700">Total Income</div>
          <div className="text-3xl mt-2 text-purple-600">${stats.totalIncome.toFixed(2)}</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow-lg text-center">
          <div className="text-xl font-semibold text-purple-700">Total Expenses</div>
          <div className="text-3xl mt-2 text-purple-600">${stats.totalExpenses.toFixed(2)}</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow-lg text-center">
          <div className="text-xl font-semibold text-purple-700">Remaining Balance</div>
          <div className="text-3xl mt-2 text-green-600">${stats.remainingBalance.toFixed(2)}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-purple-100 p-6 rounded-lg shadow-lg">
          <div className="text-2xl font-semibold text-purple-700 mb-4">Expense by Category</div>
          <div className="h-80">
            <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#4B5563', font: { size: 14 } } } } }} />
          </div>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg shadow-lg">
          <div className="text-2xl font-semibold text-purple-700 mb-4">Monthly Spending Over Time</div>
          <div className="h-80">
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#4B5563' } }, y: { beginAtZero: true, ticks: { color: '#4B5563', callback: (value) => `$${value}` } } } }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;