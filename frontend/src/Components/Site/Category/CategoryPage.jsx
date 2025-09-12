import React, { useEffect, useState } from "react";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import API from "../../../api/axios";
import Header from "../Header";
import Sidebar from "../Sidebar";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <div className="flex">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>    

        {/* Contenu principal */}
        <div className="flex-1 p-6 mt-[15vh] ml-[2vw] grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Formulaire à gauche */}
          <CategoryForm onSuccess={fetchCategories} />
          {/* Liste à droite */}
          <CategoryList categories={categories} onEdit={() => {}} onDelete={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
