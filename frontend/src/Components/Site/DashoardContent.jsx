import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import API from "../../api/axios";
import { CreditCard, DollarSign, PieChart, Calendar, TrendingUp, AlertCircle } from "lucide-react";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DashboardContent = ({ className, refreshKey }) => {
  const [stats, setStats] = useState({ totalIncome: 0, totalExpenses: 0, remainingBalance: 0 });
  const [pieChartData, setPieChartData] = useState({ labels: ["No expenses yet"], datasets: [{ data: [1], backgroundColor: ["#E5E7EB"] }] });
  const [barChartData, setBarChartData] = useState({ labels: ["No data"], datasets: [{ label: "Monthly Spending", data: [0], backgroundColor: "#E5E7EB" }] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`);

  const months = [
    { value: 1, label: "January" }, { value: 2, label: "February" }, { value: 3, label: "March" },
    { value: 4, label: "April" }, { value: 5, label: "May" }, { value: 6, label: "June" },
    { value: 7, label: "July" }, { value: 8, label: "August" }, { value: 9, label: "September" },
    { value: 10, label: "October" }, { value: 11, label: "November" }, { value: 12, label: "December" }
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true); setError("");
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

        // Pie Chart
        const pieColors = ["#1E3A8A","#2563EB","#3B82F6","#60A5FA","#93C5FD","#BFDBFE"];
        if (pieRes.data?.labels?.length > 0) {
          setPieChartData({
            labels: pieRes.data.labels,
            datasets: [{
              data: pieRes.data.datasets[0].data.map(Number),
              backgroundColor: pieColors.slice(0, pieRes.data.labels.length),
              borderColor: "#fff",
              borderWidth: 2
            }]
          });
        }

        // Bar Chart
        if (barRes.data?.labels?.length > 0) {
          setBarChartData({
            labels: barRes.data.labels,
            datasets: [{
              label: "Monthly Spending",
              data: barRes.data.datasets[0].data.map(Number),
              backgroundColor: "#2563EB",
              borderRadius: 6,
              borderColor: "#1E40AF",
              borderWidth: 1
            }]
          });
        }

      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard data");
      } finally { setLoading(false); }
    };

    fetchDashboardData();
  }, [selectedMonth, refreshKey]);

  const { totalIncome, totalExpenses, remainingBalance } = stats;

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-96 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-blue-800 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 flex flex-col gap-8 ${className}`}>
      {error && <div className="bg-red-50 border border-red-400 p-4 rounded-lg flex items-center gap-2"><AlertCircle className="text-red-600"/> {error}</div>}


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer">
          <div className="flex justify-between items-center mb-3">
            <DollarSign className="w-8 h-8"/>
            <TrendingUp className="w-5 h-5"/>
          </div>
          <p className="font-medium">Total Income</p>
          <p className="text-2xl font-bold mt-1">${totalIncome.toFixed(2)}</p>
        </div>

  
        <div className="bg-blue-800 text-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer">
          <div className="flex justify-between items-center mb-3">
            <CreditCard className="w-8 h-8"/>
            <TrendingUp className="w-5 h-5"/>
          </div>
          <p className="font-medium">Total Expenses</p>
          <p className="text-2xl font-bold mt-1">${totalExpenses.toFixed(2)}</p>
        </div>


        <div className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer ${remainingBalance >=0 ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
          <div className="flex justify-between items-center mb-3">
            <PieChart className="w-8 h-8"/>
            <TrendingUp className="w-5 h-5"/>
          </div>
          <p className="font-medium">Balance</p>
          <p className="text-2xl font-bold mt-1">${remainingBalance.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Expenses by Category</h3>
          <div className="h-80">
            <Pie data={pieChartData} options={{ responsive:true, maintainAspectRatio:false }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Monthly Spending</h3>
          <div className="h-80">
            <Bar data={barChartData} options={{ responsive:true, maintainAspectRatio:false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
