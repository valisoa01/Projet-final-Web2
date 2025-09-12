import { useState, useEffect } from "react";
import API from "../api/axios";

export const usePieChart = () => {
  const [data, setData] = useState(null);

  const fetchPie = async () => {
    try {
      const res = await API.get("/dashboard/pie-chart");
      setData(res.data);
    } catch (err) {
      console.error("Pie chart fetch error:", err);
    }
  };

  useEffect(() => {
    fetchPie();
  }, []);

  return data;
};

export const useBarChart = () => {
  const [data, setData] = useState(null);

  const fetchBar = async () => {
    try {
      const res = await API.get("/dashboard/bar-chart");
      setData(res.data);
    } catch (err) {
      console.error("Bar chart fetch error:", err);
    }
  };

  useEffect(() => {
    fetchBar();
  }, []);

  return data;
};
