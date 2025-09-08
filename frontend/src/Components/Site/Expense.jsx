import { useEffect, useState } from "react";

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
  const [newCategory, setNewCategory] = useState({ name: "", color: "#3B82F6" });
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

  // 🔹 Charger les dépenses et catégories
  useEffect(() => {
    if (!token) {
      setError("Veuillez vous connecter");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Essayer d'abord de charger depuis l'API
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

        // Charger les catégories
        const storedCategories = localStorage.getItem("expenseCategories");
        if (storedCategories) {
          const parsedCategories = JSON.parse(storedCategories);
          setCategories(parsedCategories);
          if (parsedCategories.length > 0 && !form.categoryId) {
            setForm((prev) => ({ ...prev, categoryId: parsedCategories[0].id }));
          }
        } else {
          const defaultCategories = [
            { id: "1", name: "Nourriture", color: "#EF4444" },
            { id: "2", name: "Transport", color: "#3B82F6" },
            { id: "3", name: "Logement", color: "#10B981" },
            { id: "4", name: "Loisirs", color: "#F59E0B" },
            { id: "5", name: "Santé", color: "#8B5CF6" },
          ];
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

  // 🔹 Ajouter une dépense
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

    // Validation pour récurrentes
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
          setSuccess("Dépense ajoutée avec succès via l'API!");
          apiSuccess = true;
        } else {
          const errorData = await res.json();
          throw new Error(errorData.error || "Erreur API");
        }
      } catch {
        // Fallback localStorage
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
        setSuccess("Dépense ajoutée avec succès (mode hors ligne)!");
      }

      // reset form
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
      setError(err.message || "Erreur lors de l'ajout");
    }
  };

  // 🔹 Ouvrir le modal d'édition
  const openEditModal = (expense) => {
    setEditingExpense({
      ...expense,
      startDate: expense.startDate || new Date().toISOString().split("T")[0],
    });
    setShowEditModal(true);
  };

  // 🔹 Supprimer une dépense
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
          setSuccess("Dépense supprimée avec succès!");
        } else {
          const errorData = await res.json();
          throw new Error(errorData.error || "Erreur API");
        }
      } catch {
        const updatedExpenses = expenses.filter((exp) => exp.id !== deletingExpense.id);
        setExpenses(updatedExpenses);
        localStorage.setItem("expenseExpenses", JSON.stringify(updatedExpenses));
        setUseLocalStorage(true);
        setSuccess("Dépense supprimée (hors ligne)!");
      }
    } finally {
      setDeletingExpense(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-violet-600 mb-4"></div>
          <p className="text-violet-700 font-medium">Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 px-4 py-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-lg mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-violet-800 mb-2">Gestion des Dépenses</h1>
          <p className="text-violet-600 max-w-lg mx-auto">Suivez et gérez toutes vos dépenses personnelles en un seul endroit</p>
        </div>

        {/* Alertes */}
        <div className="mb-6 space-y-3">
          {error && (
            <div className="flex items-center p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center p-4 rounded-lg bg-green-50 border border-green-200 text-green-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {success}
            </div>
          )}
          {useLocalStorage && (
            <div className="flex items-center p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Mode hors ligne : données locales utilisées.
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire ajout */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-violet-100">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-violet-100 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-violet-800">Nouvelle Dépense</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-violet-700 font-medium mb-2">Montant (Ar)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">Ar</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    required
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-violet-700 font-medium mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-violet-700 font-medium mb-2">Type</label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    required
                  >
                    <option value="one-time">Ponctuelle</option>
                    <option value="recurring">Récurrente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-violet-700 font-medium mb-2">Description</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Ex: Taxi, Déjeuner, Courses..."
                />
              </div>

              {form.type === "recurring" && (
                <div className="bg-violet-50 p-4 rounded-lg space-y-4">
                  <h3 className="font-medium text-violet-800">Détails de récurrence</h3>
                  
                  <div>
                    <label className="block text-violet-700 font-medium mb-2">Fréquence</label>
                    <select
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                      value={form.recurrence}
                      onChange={(e) => setForm({ ...form, recurrence: e.target.value })}
                    >
                      <option value="monthly">Mensuelle</option>
                      <option value="quarterly">Trimestrielle</option>
                      <option value="yearly">Annuelle</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-violet-700 font-medium mb-2">Date de début</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                        value={form.startDate}
                        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-violet-700 font-medium mb-2">Date de fin (optionnel)</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                        value={form.endDate}
                        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-violet-700 font-medium mb-2">Catégorie</label>
                <div className="flex space-x-2">
                  <select
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                    value={form.categoryId}
                    onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="bg-violet-600 text-white px-4 py-3 rounded-lg hover:bg-violet-700 transition flex items-center"
                    onClick={() => setShowCategoryModal(true)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition shadow-md font-medium"
                >
                  Ajouter la dépense
                </button>
              </div>
            </form>
          </div>

          {/* Liste des dépenses */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-violet-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="p-2 bg-violet-100 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-violet-800">Liste des Dépenses</h2>
              </div>
              <span className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm font-medium">
                {expenses.length} {expenses.length === 1 ? 'dépense' : 'dépenses'}
              </span>
            </div>
            
            {expenses.length === 0 ? (
              <div className="text-center py-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-gray-500">Aucune dépense enregistrée.</p>
                <p className="text-gray-400 text-sm mt-1">Commencez par ajouter une dépense</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {expenses.map((exp) => {
                  const cat = categories.find((c) => c.id === exp.categoryId);
                  return (
                    <div
                      key={exp.id}
                      className="flex justify-between items-start p-4 rounded-lg border border-gray-100 hover:border-violet-200 hover:bg-violet-50 transition"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg mt-1" style={{ backgroundColor: cat?.color + '20' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: cat?.color }} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{exp.description || "Sans description"}</p>
                          <p className="text-gray-600 text-sm mt-1">
                            {parseFloat(exp.amount).toLocaleString('fr-MG', { minimumFractionDigits: 2 })} Ar
                          </p>
                          <div className="flex items-center mt-2 space-x-3">
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {exp.date}
                            </span>
                            {cat && (
                              <span
                                className="text-xs px-2 py-1 rounded-full font-medium"
                                style={{ backgroundColor: cat.color + '20', color: cat.color }}
                              >
                                {cat.name}
                              </span>
                            )}
                            {exp.type === 'recurring' && (
                              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                                Récurrente
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditModal(exp)}
                          className="text-violet-600 hover:text-violet-800 p-2 rounded-full hover:bg-violet-100 transition"
                          title="Modifier"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeletingExpense(exp)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition"
                          title="Supprimer"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpensePage;