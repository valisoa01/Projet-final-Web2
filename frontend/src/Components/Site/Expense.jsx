import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Site/Header";
import Sidebar from "../Site/Sidebar";
import API from "../../api/axios"; // ton axios configuré avec baseURL
import { CreditCard, DollarSign, PieChart } from "lucide-react";

const ExpensePage = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    description: "",
    categoryId: "",
  });
  const [editingExpense, setEditingExpense] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [totals, setTotals] = useState({ income: 0, expenses: 0, balance: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Récupérer dépenses et catégories
      const [expRes, catRes, statsRes] = await Promise.all([
        API.get("/expenses"),
        API.get("/categories"),
        API.get("/dashboard/stats"),
      ]);

      setExpenses(expRes.data);
      setCategories(catRes.data);

      setTotals({
        expenses: statsRes.data.totalExpenses || 0,
        income: statsRes.data.totalIncome || 0,
        balance: statsRes.data.remainingBalance || 0,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load data from server");
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");

    if (!form.amount || form.amount <= 0) {
      setError("Amount must be positive");
      return;
    }

    try {
      if (editingExpense) {
        // Modifier via PUT
        await API.put(`/expenses/${editingExpense.id}`, form);
        setSuccess("Expense updated!");
      } else {
        // Ajouter via POST
        await API.post("/expenses", form);
        setSuccess("Expense added!");
      }
      setForm({ amount: "", description: "", categoryId: categories[0]?.id || "" });
      setEditingExpense(null);
      await fetchData(); // Recharger les données après modification
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to save expense");
    }
  };

  const handleEdit = (exp) => {
    setEditingExpense(exp);
    setForm({ amount: exp.amount, description: exp.description, categoryId: exp.categoryId });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      setSuccess("Expense deleted!");
      await fetchData();
    } catch (err) {
      console.error(err);
      setError("Failed to delete expense");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <div className="flex-1 flex flex-col p-6 overflow-auto mt-20 md:ml-64">

          {/* 🔹 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div onClick={() => navigate("/expenses")} className="cursor-pointer bg-red-50 dark:bg-red-900 hover:bg-red-100 dark:hover:bg-red-800 p-6 rounded-xl shadow-lg flex flex-col items-center transition-transform transform hover:scale-105 min-h-[140px]">
              <CreditCard className="w-10 h-10 text-red-500 mb-2"/>
              <span className="text-gray-700 dark:text-white font-semibold">Expenses</span>
              <span className="text-2xl font-bold text-red-600 mt-1">{totals.expenses.toLocaleString()} Ar</span>
            </div>

            <div onClick={() => navigate("/incomes")} className="cursor-pointer bg-green-50 dark:bg-green-900 hover:bg-green-100 dark:hover:bg-green-800 p-6 rounded-xl shadow-lg flex flex-col items-center transition-transform transform hover:scale-105 min-h-[140px]">
              <DollarSign className="w-10 h-10 text-green-500 mb-2"/>
              <span className="text-gray-700 dark:text-white font-semibold">Income</span>
              <span className="text-2xl font-bold text-green-600 mt-1">{totals.income.toLocaleString()} Ar</span>
            </div>

            <div onClick={() => navigate("/balance")} className="cursor-pointer bg-yellow-50 dark:bg-yellow-900 hover:bg-yellow-100 dark:hover:bg-yellow-800 p-6 rounded-xl shadow-lg flex flex-col items-center transition-transform transform hover:scale-105 min-h-[140px]">
              <PieChart className="w-10 h-10 text-yellow-500 mb-2"/>
              <span className="text-gray-700 dark:text-white font-semibold">Balance</span>
              <span className={`text-2xl font-bold mt-1 ${totals.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totals.balance.toLocaleString()} Ar
              </span>
            </div>
          </div>

          {/* 🔹 Expense Form */}
          <div className="bg-white rounded-xl p-4 mb-4 shadow space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">{editingExpense ? "Edit Expense" : "Add Expense"}</h2>
            <form onSubmit={handleAddOrUpdate} className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input type="number" placeholder="Amount" className="border px-3 py-2 rounded-lg" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required/>
              <input type="text" placeholder="Description" className="border px-3 py-2 rounded-lg" value={form.description} onChange={e => setForm({...form, description: e.target.value})}/>
              <select className="border px-3 py-2 rounded-lg" value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})}>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <button type="submit" className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition col-span-1 md:col-span-3">{editingExpense ? "Update Expense" : "Add Expense"}</button>
            </form>
            {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>}
            {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded">{success}</div>}
          </div>

          {/* 🔹 Expense Table */}
          <div className="bg-white rounded-xl p-4 shadow overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(exp => {
                  const cat = categories.find(c => c.id === exp.categoryId);
                  return (
                    <tr key={exp.id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-4 py-2">{exp.description}</td>
                      <td className="px-4 py-2">{parseFloat(exp.amount).toLocaleString()} Ar</td>
                      <td className="px-4 py-2">{cat?.name}</td>
                      <td className="px-4 py-2 flex gap-2">
                        <button onClick={() => handleEdit(exp)} className="text-cyan-600 hover:text-cyan-800">✏️</button>
                        <button onClick={() => handleDelete(exp.id)} className="text-red-500 hover:text-red-700">🗑️</button>
                      </td>
                    </tr>
                  );
                })}
                {expenses.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-4 py-2 text-center text-gray-500">No expenses yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExpensePage;
