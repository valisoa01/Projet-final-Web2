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
    <div className="p-4 flex flex-col gap-6 mt-[5vw] ml-[15vw]">
      <CategoryForm onSuccess={fetchCategories} />
      <CategoryList categories={categories} />
    </div>
      </div>
    </div>
  );
};

export default CategoryPage;
