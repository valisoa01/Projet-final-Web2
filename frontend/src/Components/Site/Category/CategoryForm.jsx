import React, { useState, useEffect } from "react";
import API from "../../../api/axios";
import { FiPlusCircle, FiEdit } from "react-icons/fi";

const CategoryForm = ({ onSuccess, category, onUpdate }) => {
  const [name, setName] = useState(category?.name ?? "");
  const [budget, setBudget] = useState(category?.budget ?? "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name ?? "");
      setBudget(category.budget ?? "");
    } else {
      setName("");
      setBudget("");
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = { name, budget };
      console.log("CategoryForm submit", { payload, editing: !!category });
      if (category && typeof onUpdate === "function") {
        await onUpdate(category.id ?? category._id, payload);
      } else {
        await API.post("/categories", payload);
      }
      setName("");
      setBudget("");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("CategoryForm error", err);
      setError(err.response?.data?.message || "Failed to save category");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full border border-cyan-300">
      <h2 className="text-2xl font-bold text-cyan-700 mb-4 flex items-center gap-2">
        {category ? <><FiEdit /> Edit Category</> : <><FiPlusCircle /> Add Category</>}
      </h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} className="border border-cyan-300 rounded-lg px-3 py-2" />
        <input type="number" placeholder="Budget" value={budget} onChange={(e) => setBudget(e.target.value)} className="border border-cyan-300 rounded-lg px-3 py-2" />
        <button type="submit" className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-all">
          {category ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
