import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await API.get("/expenses");
      setExpenses(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchExpenses(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mes Dépenses</h1>
      {loading ? <p>Loading...</p> :
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Description</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(e => (
            <tr key={e.id}>
              <td className="border p-2">{e.description || "-"}</td>
              <td className="border p-2">{e.amount}</td>
              <td className="border p-2">{e.Categories?.name || "-"}</td>
              <td className="border p-2">{e.type}</td>
              <td className="border p-2">{e.date ? new Date(e.date).toLocaleDateString() : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
}
