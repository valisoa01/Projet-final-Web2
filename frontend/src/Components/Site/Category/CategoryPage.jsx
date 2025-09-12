import React, { useEffect, useState } from "react";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import API from "../../../api/axios";
import Header from "../Header";
import Sidebar from "../Sidebar";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      // normalize ids if backend uses _id
      const data = Array.isArray(res.data) ? res.data : (res.data?.rows ?? []);
      const normalized = data.map((item) => ({ ...item, id: item.id ?? item._id }));
      console.log("fetchCategories ->", normalized);
      setCategories(normalized);
    } catch (err) {
      console.error("fetchCategories error", err);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleDelete = async (id) => {
    console.log("handleDelete called with id:", id);
    if (!id) { alert("ID invalide"); return; }
    if (!window.confirm("Supprimer cette catégorie ?")) return;
    try {
      await API.delete(`/categories/${id}`);
      await fetchCategories();
    } catch (err) {
      console.error("delete error", err);
      alert("Erreur lors de la suppression (regarde la console/network)");
    }
  };

  const handleEdit = (cat) => {
    console.log("handleEdit", cat);
    setSelectedCategory(cat);
    // scroll to form if needed:
    document.querySelector("#category-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUpdate = async (id, data) => {
    console.log("handleUpdate", id, data);
    try {
      if (id) {
        await API.put(`/categories/${id}`, data);
      } else {
        await API.post(`/categories`, data);
      }
      setSelectedCategory(null);
      await fetchCategories();
    } catch (err) {
      console.error("update error", err);
      alert("Erreur lors de la mise à jour");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <div className="w-64 flex-shrink-0"><Sidebar /></div>
        <div className="flex-1 p-6 mt-[15vh] ml-[2vw] grid grid-cols-1 md:grid-cols-2 gap-6">
          <div id="category-form">
            <CategoryForm
              onSuccess={fetchCategories}
              category={selectedCategory}
              onUpdate={handleUpdate}
            />
          </div>

          <CategoryList
            categories={categories}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
