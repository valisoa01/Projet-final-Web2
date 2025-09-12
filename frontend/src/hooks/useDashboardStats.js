import { useState, useEffect } from "react";
import API from "../api/axios";

export const useDashboardStats = () => {
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    remainingBalance: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await API.get("/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, error, refetch: fetchStats };
};
