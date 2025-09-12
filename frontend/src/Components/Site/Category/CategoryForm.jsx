import React, { useState } from "react";
import API from "../../../api/axios";
import { FiPlusCircle } from "react-icons/fi";

const CategoryForm = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/categories", { name, budget });
      setName(""); 
      setBudget("");
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add category");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full border border-cyan-300">
      <h2 className="text-2xl font-bold text-cyan-700 mb-4 flex items-center gap-2">
        <FiPlusCircle /> Add Category
      </h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="Category Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="border border-cyan-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500 outline-none"
        />
        <input 
          type="number" 
          placeholder="Budget" 
          value={budget} 
          onChange={(e) => setBudget(e.target.value)} 
          className="border border-cyan-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500 outline-none"
        />
        <button 
          type="submit" 
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-all flex items-center justify-center gap-2"
        >
          <FiPlusCircle /> Add
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
