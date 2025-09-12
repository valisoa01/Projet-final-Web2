import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import API from "../../../api/axios";

const CategoryList = ({ categories, onEdit, refreshCategories }) => {

  const handleDelete = async (id) => {
    if (!window.confirm("Do you really want to delete this category?")) return;
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Actualise la liste après suppression
      if (refreshCategories) refreshCategories();
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Erreur lors de la suppression de la catégorie");
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-cyan-700 mb-4">Categories</h2>
      <div className="grid gap-4">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className="bg-white border border-cyan-300 shadow-md rounded-xl p-3 flex justify-between items-center hover:shadow-lg hover:border-cyan-500 cursor-pointer transition-all"
            onClick={() => alert(`Voir détails de ${cat.name}`)}
          >
            <div>
              <h3 className="text-lg font-semibold text-cyan-800">{cat.name}</h3>
              <p className="text-sm text-gray-500">
                Budget: {cat.budget} Ar | Created: {new Date(cat.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); onEdit(cat); }} 
                className="p-2 rounded-lg hover:bg-cyan-200 transition-all"
              >
                <FiEdit className="text-cyan-700"/>
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleDelete(cat.id); }} 
                className="p-2 rounded-lg hover:bg-red-200 transition-all"
              >
                <FiTrash2 className="text-red-600"/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
