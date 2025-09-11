import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import Sidebar from "./Sidebar";

const defaultCategories = [
  { id: "1", name: "🍔 Nourriture", color: "#06B6D4" },
  { id: "2", name: "🚗 Transport", color: "#0891B2" },
  { id: "3", name: "🏠 Logement", color: "#0EA5E9" },
  { id: "4", name: "🎮 Loisirs", color: "#22D3EE" },
  { id: "5", name: "🏥 Santé", color: "#06B6D4" },
];

// Composant pour l'état de chargement
const LoadingSpinner = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex justify-center items-center h-screen bg-gradient-to-br from-cyan-50 to-blue-100"
  >
    <motion.div
      animate={{ rotate: 360, scale: [1, 1.1, 1] }}
      transition={{ rotate: { duration: 1, repeat: Infinity, ease: "linear" }, scale: { duration: 0.5, repeat: Infinity, repeatType: "reverse" } }}
      className="flex flex-col items-center"
    >
      <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full mb-4"></div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-cyan-700 font-medium">
        Chargement...
      </motion.p>
    </motion.div>
  </motion.div>
);

// Composant pour les alertes
const Alerts = ({ error, success, useLocalStorage }) => (
  <AnimatePresence>
    {error && (
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6">
        <div className="flex items-center p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 backdrop-blur-sm">
          <span className="text-xl mr-3">⚠️</span>
          {error}
        </div>
      </motion.div>
    )}
    {success && (
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6">
        <div className="flex items-center p-4 rounded-2xl bg-green-50 border border-green-200 text-green-700 backdrop-blur-sm">
          <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }} className="text-xl mr-3">
            ✅
          </motion.span>
          {success}
        </div>
      </motion.div>
    )}
    {useLocalStorage && (
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 backdrop-blur-sm">
          <span className="text-xl mr-3">📴</span>
          Mode hors ligne : données locales utilisées.
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Composant pour le formulaire de dépense
const ExpenseForm = ({ form, setForm, categories, handleSubmit }) => (
  <motion.div
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl shadow-cyan-100 border border-white/20"
  >
    <div className="flex items-center mb-8">
      <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }} className="p-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl mr-4">
        <span className="text-2xl text-white">➕</span>
      </motion.div>
      <h2 className="text-3xl font-bold text-cyan-800">Nouvelle Dépense</h2>
    </div>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-cyan-700 font-semibold mb-3 text-lg">Montant (Ar)</label>
        <motion.div whileFocus={{ scale: 1.02 }} className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-600 text-lg">💰</span>
          <input
            type="number"
            step="0.01"
            min="0"
            className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-cyan-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 transition-all duration-300 text-lg"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
            placeholder="0.00"
          />
        </motion.div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-cyan-700 font-semibold mb-3 text-lg">📅 Date</label>
          <motion.div whileFocus={{ scale: 1.02 }}>
            <input
              type="date"
              className="w-full px-6 py-4 rounded-2xl border-2 border-cyan-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 transition-all duration-300 text-lg"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
          </motion.div>
        </div>
        <div>
          <label className="block text-cyan-700 font-semibold mb-3 text-lg">🔄 Type</label>
          <motion.div whileFocus={{ scale: 1.02 }}>
            <select
              className="w-full px-6 py-4 rounded-2xl border-2 border-cyan-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 transition-all duration-300 text-lg appearance-none bg-white"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              required
            >
              <option value="one-time">Ponctuelle</option>
              <option value="recurring">Récurrente</option>
            </select>
          </motion.div>
        </div>
      </div>
      <div>
        <label className="block text-cyan-700 font-semibold mb-3 text-lg">📝 Description</label>
        <motion.div whileFocus={{ scale: 1.02 }}>
          <input
            type="text"
            className="w-full px-6 py-4 rounded-2xl border-2 border-cyan-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 transition-all duration-300 text-lg"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Ex: Taxi, Déjeuner, Courses..."
          />
        </motion.div>
      </div>
      {form.type === "recurring" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-2xl space-y-6 border-2 border-cyan-100"
        >
          <h3 className="font-bold text-cyan-800 text-lg flex items-center">
            <span className="text-xl mr-2">⏰</span>
            Détails de récurrence
          </h3>
          <div>
            <label className="block text-cyan-700 font-semibold mb-3">🔄 Fréquence</label>
            <motion.div whileFocus={{ scale: 1.02 }}>
              <select
                className="w-full px-6 py-3 rounded-2xl border-2 border-cyan-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 transition-all duration-300"
                value={form.recurrence}
                onChange={(e) => setForm({ ...form, recurrence: e.target.value })}
              >
                <option value="monthly">Mensuelle</option>
                <option value="quarterly">Trimestrielle</option>
                <option value="yearly">Annuelle</option>
              </select>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-cyan-700 font-semibold mb-3">📅 Début</label>
              <motion.div whileFocus={{ scale: 1.02 }}>
                <input
                  type="date"
                  className="w-full px-6 py-3 rounded-2xl border-2 border-cyan-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 transition-all duration-300"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                />
              </motion.div>
            </div>
            <div>
              <label className="block text-cyan-700 font-semibold mb-3">⏹️ Fin (optionnel)</label>
              <motion.div whileFocus={{ scale: 1.02 }}>
                <input
                  type="date"
                  className="w-full px-6 py-3 rounded-2xl border-2 border-cyan-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 transition-all duration-300"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
      <div>
        <label className="block text-cyan-700 font-semibold mb-3 text-lg">🏷️ Catégorie</label>
        <div className="flex space-x-4">
          <motion.div whileFocus={{ scale: 1.02 }} className="flex-1">
            <select
              className="w-full px-6 py-4 rounded-2xl border-2 border-cyan-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 transition-all duration-300 text-lg appearance-none bg-white"
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-4 rounded-2xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 flex items-center shadow-lg shadow-cyan-200"
            onClick={() => setShowCategoryModal(true)}
          >
            <span className="text-xl">➕</span>
          </motion.button>
        </div>
      </div>
      <div className="pt-6">
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px rgba(6, 182, 212, 0.5)" }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-5 rounded-2xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-2xl shadow-cyan-300 font-bold text-lg"
        >
          <span className="text-xl mr-3">💾</span>
          Ajouter la dépense
        </motion.button>
      </div>
    </form>
  </motion.div>
);

// Composant pour la liste des dépenses
const ExpenseList = ({ expenses, categories, openEditModal, setDeletingExpense }) => (
  <motion.div
    initial={{ x: 50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl shadow-cyan-100 border border-white/20"
  >
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <motion.div whileHover={{ rotate: 10 }} className="p-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl mr-4">
          <span className="text-2xl text-white">📋</span>
        </motion.div>
        <h2 className="text-3xl font-bold text-cyan-800">Mes Dépenses</h2>
      </div>
      <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
        {expenses.length} {expenses.length === 1 ? 'dépense' : 'dépenses'}
      </motion.span>
    </div>
    {expenses.length === 0 ? (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
        <motion.div animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="text-6xl mb-6">
          💸
        </motion.div>
        <p className="text-gray-500 text-lg mb-2">Aucune dépense enregistrée</p>
        <p className="text-gray-400">Commencez par ajouter une dépense</p>
      </motion.div>
    ) : (
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        <AnimatePresence>
          {expenses.map((exp, index) => {
            const cat = categories.find((c) => c.id === exp.categoryId);
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex justify-between items-start p-6 rounded-2xl bg-white/50 backdrop-blur-sm border-2 border-cyan-100 hover:border-cyan-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="p-3 rounded-2xl mt-1 shadow-md" style={{ backgroundColor: cat?.color + '20' }}>
                    <span className="text-2xl" style={{ color: cat?.color }}>
                      {cat?.name.split(' ')[0]}
                    </span>
                  </motion.div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">{exp.description || "Sans description"}</p>
                    <motion.p initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-2xl font-bold text-cyan-700 mt-2">
                      {parseFloat(exp.amount).toLocaleString('fr-MG')} Ar
                    </motion.p>
                    <div className="flex items-center mt-3 space-x-3">
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        📅 {new Date(exp.date).toLocaleDateString('fr-FR')}
                      </span>
                      {cat && (
                        <span className="text-sm px-3 py-1 rounded-full font-medium" style={{ backgroundColor: cat.color + '20', color: cat.color }}>
                          {cat.name}
                        </span>
                      )}
                      {exp.type === 'recurring' && (
                        <span className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full">🔄 Récurrente</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openEditModal(exp)}
                    className="text-cyan-600 hover:text-cyan-800 p-3 rounded-2xl hover:bg-cyan-100 transition-all duration-300"
                    title="Modifier"
                  >
                    <span className="text-xl">✏️</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setDeletingExpense(exp)}
                    className="text-red-500 hover:text-red-700 p-3 rounded-2xl hover:bg-red-100 transition-all duration-300"
                    title="Supprimer"
                  >
                    <span className="text-xl">🗑️</span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    )}
  </motion.div>
);

// Composant pour la modale de confirmation de suppression
const DeleteConfirmationModal = ({ deletingExpense, setDeletingExpense, handleDeleteExpense }) => (
  <AnimatePresence>
    {deletingExpense && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
        >
          <div className="text-center mb-6">
            <span className="text-6xl">❓</span>
            <h3 className="text-2xl font-bold text-cyan-800 mt-4">Confirmer la suppression</h3>
            <p className="text-gray-600 mt-2">Êtes-vous sûr de vouloir supprimer cette dépense ?</p>
          </div>
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-2xl border-2 border-cyan-200 text-cyan-600 hover:bg-cyan-50 transition-all duration-300"
              onClick={() => setDeletingExpense(null)}
            >
              Annuler
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-2xl bg-red-600 text-white hover:bg-red-700 transition-all duration-300 shadow-lg shadow-red-200"
              onClick={handleDeleteExpense}
            >
              Supprimer
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

function ExpensePage() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [deletingExpense, setDeletingExpense] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: "", color: "#06B6D4" });
  const [addingCategory, setAddingCategory] = useState(false);
  const [useLocalStorage, setUseLocalStorage] = useState(false);

  const [form, setForm] = useState({
    amount: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    type: "one-time",
    categoryId: "",
    recurrence: "monthly",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("Veuillez vous connecter");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        try {
          const expensesResponse = await fetch("http://localhost:5000/api/expenses", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (expensesResponse.ok) {
            const expensesData = await expensesResponse.json();
            setExpenses(expensesData);
            console.log("Données chargées depuis l'API");
          } else {
            throw new Error("API non disponible");
          }
        } catch (apiError) {
          console.log("API non disponible, utilisation du localStorage");
          setUseLocalStorage(true);
          const storedExpenses = localStorage.getItem("expenseExpenses");
          if (storedExpenses) {
            setExpenses(JSON.parse(storedExpenses));
          }
        }

        const storedCategories = localStorage.getItem("expenseCategories");
        if (storedCategories) {
          const parsedCategories = JSON.parse(storedCategories);
          setCategories(parsedCategories);
          if (parsedCategories.length > 0 && !form.categoryId) {
            setForm((prev) => ({ ...prev, categoryId: parsedCategories[0].id }));
          }
        } else {
          setCategories(defaultCategories);
          localStorage.setItem("expenseCategories", JSON.stringify(defaultCategories));
          setForm((prev) => ({ ...prev, categoryId: defaultCategories[0].id }));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.amount || form.amount <= 0) {
      setError("Le montant doit être positif");
      return;
    }
    if (!form.categoryId) {
      setError("Veuillez sélectionner une catégorie");
      return;
    }

    if (form.type === "recurring") {
      if (!form.startDate) {
        setError("La date de début est requise");
        return;
      }
      if (form.endDate && new Date(form.endDate) <= new Date(form.startDate)) {
        setError("La date de fin doit être après la date de début");
        return;
      }
    }

    try {
      let apiSuccess = false;
      try {
        const expenseData = {
          amount: parseFloat(form.amount),
          date: form.date,
          description: form.description,
          type: form.type,
          categoryId: form.categoryId,
        };

        if (form.type === "recurring") {
          expenseData.recurrence = form.recurrence;
          expenseData.startDate = form.startDate;
          expenseData.endDate = form.endDate || null;
        }

        const res = await fetch("http://localhost:5000/api/expenses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(expenseData),
        });

        if (res.ok) {
          const data = await res.json();
          setExpenses([data, ...expenses]);
          setSuccess("💰 Dépense ajoutée avec succès !");
          apiSuccess = true;
        } else {
          const errorData = await res.json();
          throw new Error(errorData.error || "Erreur API");
        }
      } catch {
        const newExpense = {
          id: Date.now().toString(),
          amount: parseFloat(form.amount),
          date: form.date,
          description: form.description,
          type: form.type,
          categoryId: form.categoryId,
          category: categories.find((cat) => cat.id === form.categoryId),
          recurrence: form.type === "recurring" ? form.recurrence : null,
          startDate: form.type === "recurring" ? form.startDate : null,
          endDate: form.type === "recurring" ? form.endDate : null,
          createdAt: new Date().toISOString(),
        };

        const updatedExpenses = [newExpense, ...expenses];
        setExpenses(updatedExpenses);
        localStorage.setItem("expenseExpenses", JSON.stringify(updatedExpenses));
        setUseLocalStorage(true);
        setSuccess("💰 Dépense ajoutée (mode hors ligne) !");
      }

      setForm({
        amount: "",
        date: new Date().toISOString().split("T")[0],
        description: "",
        type: "one-time",
        categoryId: categories.length > 0 ? categories[0].id : "",
        recurrence: "monthly",
        startDate: new Date().toISOString().split("T")[0],
        endDate: "",
      });
    } catch (err) {
      setError(err.message || "❌ Erreur lors de l'ajout");
    }
  };

  const openEditModal = (expense) => {
    setEditingExpense({
      ...expense,
      startDate: expense.startDate || new Date().toISOString().split("T")[0],
    });
    setShowEditModal(true);
  };

  const handleDeleteExpense = async () => {
    if (!deletingExpense) return;
    try {
      try {
        const res = await fetch(`http://localhost:5000/api/expenses/${deletingExpense.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          setExpenses(expenses.filter((exp) => exp.id !== deletingExpense.id));
          setSuccess("🗑️ Dépense supprimée avec succès !");
        } else {
          const errorData = await res.json();
          throw new Error(errorData.error || "Erreur API");
        }
      } catch {
        const updatedExpenses = expenses.filter((exp) => exp.id !== deletingExpense.id);
        setExpenses(updatedExpenses);
        localStorage.setItem("expenseExpenses", JSON.stringify(updatedExpenses));
        setUseLocalStorage(true);
        setSuccess("🗑️ Dépense supprimée (hors ligne) !");
      }
    } finally {
      setDeletingExpense(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-64 pt-[10vh] px-4 py-8">
          <div className="container mx-auto max-w-6xl">
            <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <motion.div whileHover={{ scale: 1.05, rotate: 5 }} className="inline-flex items-center justify-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl shadow-cyan-200 mb-6">
                <motion.div animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                  <span className="text-4xl">💰</span>
                </motion.div>
              </motion.div>
              <h1 className="text-5xl font-bold text-cyan-800 mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Gestion des Dépenses
              </h1>
              <p className="text-cyan-600/80 text-lg max-w-lg mx-auto font-light">Suivez et gérez toutes vos dépenses personnelles en un seul endroit</p>
            </motion.div>

            <Alerts error={error} success={success} useLocalStorage={useLocalStorage} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ExpenseForm form={form} setForm={setForm} categories={categories} handleSubmit={handleSubmit} />
              <ExpenseList expenses={expenses} categories={categories} openEditModal={openEditModal} setDeletingExpense={setDeletingExpense} />
            </div>

            <DeleteConfirmationModal deletingExpense={deletingExpense} setDeletingExpense={setDeletingExpense} handleDeleteExpense={handleDeleteExpense} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ExpensePage;
