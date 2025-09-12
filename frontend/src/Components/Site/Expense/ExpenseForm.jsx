// src/Components/Site/Expense/ExpenseForm.jsx
import { useState, useEffect } from "react";
import API from "../../../api/axios";

export default function ExpenseForm({ categories, editingExpense, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    type: "one-time",
    categoryId: "",
    date: "",
    startDate: "",
    endDate: ""
  });
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        amount: editingExpense.amount || "",
        description: editingExpense.description || "",
        type: editingExpense.type || "one-time",
        categoryId: editingExpense.CategoryId || "",
        date: editingExpense.date ? editingExpense.date.split("T")[0] : "",
        startDate: editingExpense.startDate ? editingExpense.startDate.split("T")[0] : "",
        endDate: editingExpense.endDate ? editingExpense.endDate.split("T")[0] : ""
      });
    }
  }, [editingExpense]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.amount || !formData.categoryId) {
      setError("Amount and category are required");
      setLoading(false);
      return;
    }

    if (parseFloat(formData.amount) <= 0) {
      setError("Amount must be greater than 0");
      setLoading(false);
      return;
    }

    const submitData = new FormData();
    submitData.append("amount", parseFloat(formData.amount));
    submitData.append("description", formData.description);
    submitData.append("type", formData.type);
    submitData.append("categoryId", formData.categoryId);

    if (formData.type === "one-time") {
      if (!formData.date) {
        setError("Date is required for one-time expenses");
        setLoading(false);
        return;
      }
      submitData.append("date", formData.date);
    } else {
      if (!formData.startDate) {
        setError("Start date is required for recurring expenses");
        setLoading(false);
        return;
      }
      submitData.append("startDate", formData.startDate);
      if (formData.endDate) submitData.append("endDate", formData.endDate);
    }

    if (receipt) submitData.append("receipt", receipt);

    try {
      if (editingExpense) {
        await API.put(`/expenses/${editingExpense.id}`, submitData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("/expenses", submitData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      
      // Reset form
      setFormData({
        amount: "",
        description: "",
        type: "one-time",
        categoryId: "",
        date: "",
        startDate: "",
        endDate: ""
      });
      setReceipt(null);
      setError("");
      
      // Call success callback
      onSuccess();
      
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
      console.error("Expense form error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      amount: "",
      description: "",
      type: "one-time",
      categoryId: "",
      date: "",
      startDate: "",
      endDate: ""
    });
    setReceipt(null);
    setError("");
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        {editingExpense ? "Edit Expense" : "Add New Expense"}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount ($) *
          </label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => handleInputChange('amount', e.target.value)}
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0.00"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            value={formData.categoryId}
            onChange={(e) => handleInputChange('categoryId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading || categories.length === 0}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {categories.length === 0 && (
            <p className="text-sm text-red-600 mt-1">
              No categories available. Please create a category first.
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter expense description"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type *
        </label>
        <select
          value={formData.type}
          onChange={(e) => handleInputChange('type', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={loading}
        >
          <option value="one-time">One-Time</option>
          <option value="recurring">Recurring</option>
        </select>
      </div>

      {formData.type === "one-time" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date *
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
        </div>
      )}

      {formData.type === "recurring" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date *
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date (optional)
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Receipt (optional)
        </label>
        <input
          type="file"
          onChange={(e) => setReceipt(e.target.files[0])}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={loading}
          accept="image/*,.pdf,.doc,.docx"
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          disabled={loading || categories.length === 0}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Processing..." : editingExpense ? "Update Expense" : "Add Expense"}
        </button>
        
        {editingExpense && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}