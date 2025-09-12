import React, { useState } from "react";
import API from "../../../api/axios";

const CategoryForm = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/categories", { name, budget });
      setName(""); setBudget("");
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add category");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-blue-900 mb-4">Add Category</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-blue-400"/>
        <input type="number" placeholder="Budget" value={budget} onChange={(e) => setBudget(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-blue-400"/>
        <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-all">Add Category</button>
      </form>
    </div>
  );
};

export default CategoryForm;
