// src/Components/Site/Expense/ExpenseForm.jsx
import { useState, useEffect } from "react";
import API from "../../../api/axios";
import { Upload } from "lucide-react";

const categoryEmojis = {
  Food: "🍔",
  Transport: "🚗",
  Housing: "🏠",
  Entertainment: "🎬",
  Shopping: "🛍️",
  Utilities: "💡",
  Health: "💊",
  Other: "📝",
};

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

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
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
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-3">
      <h2 className="text-lg font-semibold text-gray-800">
        {editingExpense ? "Edit Expense" : "Add Expense"}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto py-2">
        {categories.map(cat => (
          <div
            key={cat.id}
            onClick={() => handleChange("categoryId", cat.id)}
            className={`flex-shrink-0 px-3 py-1 rounded-lg cursor-pointer text-sm font-medium border ${
              formData.categoryId === cat.id
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-800 border-gray-300"
            }`}
          >
            <span className="mr-1">{categoryEmojis[cat.name] || "📝"}</span>
            <span>{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Compact fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          placeholder="Amount $"
          className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />

        <select
          value={formData.type}
          onChange={(e) => handleChange("type", e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="one-time">One-Time</option>
          <option value="recurring">Recurring</option>
        </select>

        {formData.type === "one-time" && (
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        )}

        {formData.type === "recurring" && (
          <>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </>
        )}

        <input
          type="text"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Description"
          className="col-span-1 md:col-span-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />

        <label className="flex items-center space-x-2 col-span-1 md:col-span-2 cursor-pointer px-2 py-1 border border-gray-300 rounded-md">
          <Upload className="w-4 h-4 text-gray-600" />
          <span className="text-sm">{receipt ? receipt.name : "Upload Receipt"}</span>
          <input
            type="file"
            onChange={(e) => setReceipt(e.target.files[0])}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
          />
        </label>
      </div>

      {/* Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={handleSubmit}
          disabled={loading || categories.length === 0}
          className="flex-1 bg-blue-600 text-white py-1 text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? "Processing..." : editingExpense ? "Update" : "Add"}
        </button>
        {editingExpense && (
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 bg-gray-500 text-white py-1 text-sm rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
