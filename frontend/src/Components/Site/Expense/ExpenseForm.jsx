// src/Components/Site/Expense/ExpenseForm.jsx
import { useState, useEffect } from "react";
import API from "../../../api/axios";
import { Upload, Utensils, Car, Home, Film, ShoppingBag, Lightbulb, HeartPulse, FileText } from "lucide-react";

const categoryIcons = {
  Food: <Utensils className="w-4 h-4 mr-1" />,
  Transport: <Car className="w-4 h-4 mr-1" />,
  Housing: <Home className="w-4 h-4 mr-1" />,
  Entertainment: <Film className="w-4 h-4 mr-1" />,
  Shopping: <ShoppingBag className="w-4 h-4 mr-1" />,
  Utilities: <Lightbulb className="w-4 h-4 mr-1" />,
  Health: <HeartPulse className="w-4 h-4 mr-1" />,
  Other: <FileText className="w-4 h-4 mr-1" />,
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
    <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4 mt-15">
      <h2 className="text-xl font-bold text-cyan-700">
        {editingExpense ? "Edit Expense" : "Add Expense"}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Categories */}
      <div className="flex space-x-3 overflow-x-auto py-2">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleChange("categoryId", cat.id)}
            className={`flex-shrink-0 flex items-center px-4 py-2 rounded-xl cursor-pointer font-medium border transition-all duration-200
              ${
                formData.categoryId === cat.id
                  ? "bg-cyan-600 text-white border-cyan-600"
                  : "bg-cyan-100 text-cyan-800 border-cyan-200 hover:bg-cyan-200"
              }`}
          >
            {categoryIcons[cat.name] || <FileText className="w-4 h-4 mr-2" />}
            <span>{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          placeholder="Amount $"
          className="px-3 py-2 border border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm transition"
        />

        <select
          value={formData.type}
          onChange={(e) => handleChange("type", e.target.value)}
          className="px-3 py-2 border border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm transition"
        >
          <option value="one-time">One-Time</option>
          <option value="recurring">Recurring</option>
        </select>

        {formData.type === "one-time" && (
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="px-3 py-2 border border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm transition"
          />
        )}

        {formData.type === "recurring" && (
          <>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              className="px-3 py-2 border border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm transition"
            />
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              className="px-3 py-2 border border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm transition"
            />
          </>
        )}

        <input
          type="text"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Description"
          className="col-span-1 md:col-span-2 px-3 py-2 border border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm transition"
        />

        <label className="flex items-center space-x-2 col-span-1 md:col-span-2 cursor-pointer px-3 py-2 border border-cyan-200 rounded-xl hover:bg-cyan-50 transition">
          <Upload className="w-4 h-4 text-cyan-600" />
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
          className="flex-1 bg-cyan-600 text-white py-2 text-sm rounded-xl hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 transition"
        >
          {loading ? "Processing..." : editingExpense ? "Update" : "Add"}
        </button>
        {editingExpense && (
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 bg-gray-400 text-white py-2 text-sm rounded-xl hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
