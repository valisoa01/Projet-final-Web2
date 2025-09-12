// src/Components/Site/Expense/ExpensePage.jsx
import { useEffect, useState } from "react";
import API from "../../../api/axios";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import Header from "../Header";
import Sidebar from "../Sidebar";

export default function ExpensePage({ onChange }) {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await API.get("/expenses");
      setExpenses(res.data);
      if (onChange) onChange();
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setError("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    
    try {
      await API.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error("Error deleting expense:", err);
      alert(err.response?.data?.message || "Error deleting expense");
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleSuccess = () => {
    setEditingExpense(null);
    setTimeout(() => {
      fetchExpenses();
    }, 300);
  };

  const handleCancel = () => {
    setEditingExpense(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Expense Management</h1>
              <p className="text-gray-600 mt-2">
                Track and manage your expenses. Add one-time or recurring expenses with categories.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
                {error}
              </div>
            )}

            {/* Formulaire uniquement */}
            <div className="mb-8">
              <ExpenseForm
                categories={categories}
                editingExpense={editingExpense}
                onSuccess={handleSuccess}
                onCancel={handleCancel}
              />
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading expenses...</span>
              </div>
            ) : (
              <ExpenseList
                expenses={expenses}
                categories={categories}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
