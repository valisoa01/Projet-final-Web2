// components/Dashboard/Dashboard.jsx
import { useEffect, useState } from "react";
import API from "../api/axios";
import { Pie, Bar } from "react-chartjs-2";
import 'chart.js/auto';

export default function Dashboard() {
  const [stats, setStats] = useState({ totalIncome:0, totalExpenses:0, remainingBalance:0 });
  const [pieData, setPieData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [statsRes, pieRes, barRes] = await Promise.all([
          API.get("/dashboard/stats"),
          API.get("/dashboard/pie-chart"),
          API.get("/dashboard/bar-chart")
        ]);

        setStats(statsRes.data);
        setPieData(pieRes.data);
        setBarData(barRes.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      
      <div className="mb-4">
        <p>Total Income: {stats.totalIncome}</p>
        <p>Total Expenses: {stats.totalExpenses}</p>
        <p>Remaining Balance: {stats.remainingBalance}</p>
      </div>

      <div className="flex gap-8">
        <div className="w-1/2">
          <h2 className="text-lg font-semibold mb-2">Pie Chart</h2>
          {pieData ? <Pie data={pieData} /> : <p>No data</p>}
        </div>

        <div className="w-1/2">
          <h2 className="text-lg font-semibold mb-2">Bar Chart</h2>
          {barData ? <Bar data={barData} /> : <p>No data</p>}
        </div>
      </div>
    </div>
  );
}
