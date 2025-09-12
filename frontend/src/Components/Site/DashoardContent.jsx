import React, { useEffect, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from "chart.js";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { CreditCard, DollarSign, PieChart, TrendingUp, AlertCircle } from "lucide-react";

ChartJS.register(ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const DashboardContent = ({ className, refreshKey }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalIncome: 0, totalExpenses: 0, remainingBalance: 0 });
  const [pieChartData, setPieChartData] = useState({ labels: [], datasets: [{ data: [], backgroundColor: [] }] });
  const [lineChartData, setLineChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [statsRes, pieRes, barRes] = await Promise.all([
          API.get(`/dashboard/stats?month=${selectedMonth}`),
          API.get(`/dashboard/pie-chart?month=${selectedMonth}`),
          API.get(`/dashboard/bar-chart`)
        ]);

        setStats({
          totalIncome: Number(statsRes.data.totalIncome || 0),
          totalExpenses: Number(statsRes.data.totalExpenses || 0),
          remainingBalance: Number(statsRes.data.remainingBalance || 0)
        });

        // Pie chart
        const pastelColors = ["#81D4FA", "#4FC3F7", "#4DD0E1", "#26C6DA", "#80CBC4", "#A5D6A7", "#FFF176"];
        if (pieRes.data?.labels?.length > 0) {
          const labels = pieRes.data.labels;
          const data = pieRes.data.datasets[0].data.map(Number);
          const colors = labels.map((_, i) => pastelColors[i % pastelColors.length]);

          setPieChartData({
            labels,
            datasets: [{
              data,
              backgroundColor: colors,
              borderColor: "#fff",
              borderWidth: 2
            }]
          });
        }

        // Line chart
        if (barRes.data?.labels?.length > 0) {
          const labels = barRes.data.labels;
          const data = barRes.data.datasets[0].data.map(Number);

          setLineChartData({
            labels,
            datasets: [
              {
                label: "Monthly Spending",
                data,
                borderColor: "#4DD0E1",
                backgroundColor: "rgba(77, 208, 225, 0.2)",
                fill: true,
                tension: 0.4,          // lissage courbe
                pointRadius: 5,
                pointBackgroundColor: "#26C6DA",
                pointHoverRadius: 6
              }
            ]
          });
        }

      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [selectedMonth, refreshKey]);

  const { totalIncome, totalExpenses, remainingBalance } = stats;

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-96 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-400 mx-auto"></div>
          <p className="mt-4 text-cyan-700 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 flex flex-col gap-8 ${className}`}>
      {error && <div className="bg-red-50 border border-red-400 p-4 rounded-lg flex items-center gap-2"><AlertCircle className="text-red-600"/> {error}</div>}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income */}
        <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer">
          <div className="flex justify-between items-center mb-3">
            <DollarSign className="w-8 h-8"/>
            <TrendingUp className="w-5 h-5"/>
          </div>
          <p className="font-medium">Total Income</p>
          <p className="text-2xl font-bold mt-1">{totalIncome.toFixed(2)} Ar</p>
        </div>

        {/* Expenses */}
        <div className="bg-blue-800 text-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer">
          <div className="flex justify-between items-center mb-3">
            <CreditCard className="w-8 h-8"/>
            <TrendingUp className="w-5 h-5"/>
          </div>
          <p className="font-medium">Total Expenses</p>
          <p className="text-2xl font-bold mt-1">{totalExpenses.toFixed(2)} Ar</p>
        </div>

        {/* Balance */}
        <div className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer ${remainingBalance >=0 ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
          <div className="flex justify-between items-center mb-3">
            <PieChart className="w-8 h-8"/>
            <TrendingUp className="w-5 h-5"/>
          </div>
          <p className="font-medium">Balance</p>
          <p className="text-2xl font-bold mt-1">{remainingBalance.toFixed(2)} Ar</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold text-cyan-900 mb-4">Expenses by Category</h3>
          <div className="h-80">
            <Pie data={pieChartData} options={{ responsive:true, maintainAspectRatio:false }} />
          </div>
        </div>

        {/* Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold text-cyan-900 mb-4">Monthly Spending</h3>
          <div className="h-80">
            <Line data={lineChartData} options={{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:true}} }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
