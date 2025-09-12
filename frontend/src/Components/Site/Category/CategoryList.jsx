import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const formatDate = (d) => {
  if (!d) return "—";
  try { return new Date(d).toLocaleDateString(); } catch (e) { return "—"; }
};

const CategoryList = ({ categories = [], onEdit, onDelete }) => {
  if (!Array.isArray(categories)) {
    console.warn("CategoryList: 'categories' is not an array", categories);
    return <div className="text-red-600">Erreur: données invalides</div>;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-cyan-700 mb-4">Categories</h2>
      <div className="grid gap-4">
        {categories.length === 0 && <div className="text-gray-500">Aucune catégorie</div>}
        {categories.map((cat) => {
          const created = cat.createdAt ?? cat.created_at ?? cat.created;
          const key = cat.id ?? cat._id ?? Math.random();
          return (
            <div
              key={key}
              className="bg-white border border-cyan-300 shadow-md rounded-xl p-3 flex justify-between items-center hover:shadow-lg transition-all"
            >
              <div>
                <h3 className="text-lg font-semibold text-cyan-800">{cat.name ?? "—"}</h3>
                <p className="text-sm text-gray-500">
                  Budget: {cat.budget ?? "—"} Ar | Created: {formatDate(created)}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("CategoryList: edit clicked", cat);
                    if (typeof onEdit === "function") onEdit(cat);
                    else console.warn("onEdit not provided");
                  }}
                  className="p-2 rounded-lg hover:bg-cyan-200 transition-all"
                >
                  <FiEdit className="text-cyan-700" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("CategoryList: delete clicked", cat.id ?? cat._id);
                    if (typeof onDelete === "function") onDelete(cat.id ?? cat._id);
                    else console.warn("onDelete not provided");
                  }}
                  className="p-2 rounded-lg hover:bg-red-200 transition-all"
                >
                  <FiTrash2 className="text-red-600" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
