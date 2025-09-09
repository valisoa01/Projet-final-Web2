import { useEffect, useState } from "react";

function ExpensePage() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", color: "#3B82F6" });
  const [addingCategory, setAddingCategory] = useState(false);
  const [useLocalStorage, setUseLocalStorage] = useState(false);
  
  const [form, setForm] = useState({
    amount: "",
    date: new Date().toISOString().split('T')[0],
    description: "",
    type: "one-time",
    categoryId: "",
    recurrence: "monthly",
    startDate: new Date().toISOString().split('T')[0],
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
          // Charger depuis localStorage
          const storedExpenses = localStorage.getItem('expenseExpenses');
          if (storedExpenses) {
            setExpenses(JSON.parse(storedExpenses));
          }
        }

        // Charger les catégories depuis localStorage
        const storedCategories = localStorage.getItem('expenseCategories');
        if (storedCategories) {
          const parsedCategories = JSON.parse(storedCategories);
          setCategories(parsedCategories);
          
          if (parsedCategories.length > 0 && !form.categoryId) {
            setForm(prev => ({ ...prev, categoryId: parsedCategories[0].id }));
          }
        } else {
          // Catégories par défaut
          const defaultCategories = [
            { id: "1", name: "Nourriture", color: "#EF4444" },
            { id: "2", name: "Transport", color: "#3B82F6" },
            { id: "3", name: "Logement", color: "#10B981" },
            { id: "4", name: "Loisirs", color: "#F59E0B" },
            { id: "5", name: "Santé", color: "#8B5CF6" }
          ];
          setCategories(defaultCategories);
          localStorage.setItem('expenseCategories', JSON.stringify(defaultCategories));
          
          if (defaultCategories.length > 0 && !form.categoryId) {
            setForm(prev => ({ ...prev, categoryId: defaultCategories[0].id }));
          }
        }
        
      } catch (err) {
        setError(err.message);
        console.error(err);
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

    // Validation des dates pour les dépenses récurrentes
    if (form.type === "recurring") {
      if (!form.startDate) {
        setError("La date de début est requise pour les dépenses récurrentes");
        return;
      }
      if (form.endDate && new Date(form.endDate) <= new Date(form.startDate)) {
        setError("La date de fin doit être après la date de début");
        return;
      }
    }

    try {
      // Essayer d'abord l'API
      let apiSuccess = false;
      try {
        const expenseData = {
          amount: parseFloat(form.amount),
          date: form.date,
          description: form.description,
          type: form.type,
          categoryId: form.categoryId,
        };

        // Ajouter les champs spécifiques aux dépenses récurrentes
        if (form.type === "recurring") {
          expenseData.recurrence = form.recurrence;
          expenseData.startDate = form.startDate;
          expenseData.endDate = form.endDate || null;
        }

        console.log("Envoi des données à l'API:", expenseData);

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
      } catch (apiError) {
        console.log("Erreur API, utilisation du fallback localStorage:", apiError);
        
        // Fallback vers localStorage
        const newExpense = {
          id: Date.now().toString(),
          amount: parseFloat(form.amount),
          date: form.date,
          description: form.description,
          type: form.type,
          categoryId: form.categoryId,
          category: categories.find(cat => cat.id === form.categoryId),
          recurrence: form.type === "recurring" ? form.recurrence : null,
          startDate: form.type === "recurring" ? form.startDate : null,
          endDate: form.type === "recurring" ? form.endDate : null,
          createdAt: new Date().toISOString()
        };
        
        const updatedExpenses = [newExpense, ...expenses];
        setExpenses(updatedExpenses);
        localStorage.setItem('expenseExpenses', JSON.stringify(updatedExpenses));
        setUseLocalStorage(true);
        setSuccess("Dépense ajoutée avec succès (mode hors ligne)!");
      }
      
      // Réinitialiser le formulaire
      setForm({ 
        amount: "", 
        date: new Date().toISOString().split('T')[0], 
        description: "", 
        type: "one-time",
        categoryId: categories.length > 0 ? categories[0].id : "",
        recurrence: "monthly",
        startDate: new Date().toISOString().split('T')[0],
        endDate: "",
      });
      
    } catch (err) {
      console.error("Erreur complète:", err);
      setError(err.message || "Erreur lors de l'ajout. Voir la console pour plus de détails.");
    }
  };

  // 🔹 Ajouter une nouvelle catégorie
  const handleAddCategory = async (e) => {
    e.preventDefault();
    setAddingCategory(true);
    setError("");
    
    if (!newCategory.name.trim()) {
      setError("Le nom de la catégorie est requis");
      setAddingCategory(false);
      return;
    }

    try {
      // Solution temporaire avec localStorage
      const newCategoryWithId = {
        ...newCategory,
        id: Date.now().toString()
      };

      const updatedCategories = [...categories, newCategoryWithId];
      setCategories(updatedCategories);
      localStorage.setItem('expenseCategories', JSON.stringify(updatedCategories));
      
      // Fermer le modal et réinitialiser
      setShowCategoryModal(false);
      setNewCategory({ name: "", color: "#3B82F6" });
      setSuccess("Catégorie ajoutée avec succès!");
      
    } catch (err) {
      setError("Erreur lors de l'ajout de la catégorie");
      console.error(err);
    } finally {
      setAddingCategory(false);
    }
  };

  // 🔹 Fermer le modal
  const handleCloseModal = () => {
    setShowCategoryModal(false);
    setNewCategory({ name: "", color: "#3B82F6" });
  };

  // 🔹 Calculer la date de prochaine occurrence
  const getNextOccurrence = (expense) => {
    if (expense.type !== "recurring" || !expense.startDate) return null;
    
    const startDate = new Date(expense.startDate);
    const today = new Date();
    
    if (expense.recurrence === "monthly") {
      const nextDate = new Date(startDate);
      while (nextDate <= today) {
        nextDate.setMonth(nextDate.getMonth() + 1);
      }
      return nextDate.toLocaleDateString('fr-FR');
    }
    else if (expense.recurrence === "quarterly") {
      const nextDate = new Date(startDate);
      while (nextDate <= today) {
        nextDate.setMonth(nextDate.getMonth() + 3);
      }
      return nextDate.toLocaleDateString('fr-FR');
    }
    else if (expense.recurrence === "yearly") {
      const nextDate = new Date(startDate);
      while (nextDate <= today) {
        nextDate.setFullYear(nextDate.getFullYear() + 1);
      }
      return nextDate.toLocaleDateString('fr-FR');
    }
    
    return "Date inconnue";
  };

  // 🔹 Vérifier si une dépense récurrente est en retard
  const isOverdue = (expense) => {
    if (expense.type !== "recurring" || !expense.startDate) return false;
    
    const nextOccurrence = getNextOccurrence(expense);
    if (!nextOccurrence) return false;
    
    const nextDate = new Date(nextOccurrence.split('/').reverse().join('-'));
    const today = new Date();
    
    return nextDate < today;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-violet-800 mb-2">Gestion des Dépenses</h1>
        <p className="text-violet-600">Suivez et gérez toutes vos dépenses en un seul endroit</p>
      </div>

      {/* Alertes */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 shadow-md">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 shadow-md">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{success}</span>
          </div>
        </div>
      )}

      {useLocalStorage && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg mb-6">
          <p>Mode hors ligne: Les données sont stockées localement.</p>
        </div>
      )}

      {/* Modal pour ajouter une catégorie */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-violet-800 mb-4">Nouvelle Catégorie</h3>
            <form onSubmit={handleAddCategory}>
              <div className="mb-4">
                <label className="block text-violet-700 font-medium mb-2">Nom de la catégorie</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-violet-300 focus:ring-2 focus:ring-violet-500"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  required
                  placeholder="Ex: Courses, Transport..."
                />
              </div>
              <div className="mb-4">
                <label className="block text-violet-700 font-medium mb-2">Couleur</label>
                <div className="flex items-center">
                  <input
                    type="color"
                    className="w-10 h-10 rounded-lg border border-violet-300 mr-3"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                  />
                  <span className="text-sm text-gray-500">Choisissez une couleur</span>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 text-violet-600 hover:text-violet-800 font-medium"
                  onClick={handleCloseModal}
                  disabled={addingCategory}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 font-medium disabled:opacity-50"
                  disabled={addingCategory}
                >
                  {addingCategory ? "Ajout..." : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulaire d'ajout */}
        <div className="bg-gradient-to-br from-violet-50 to-purple-100 rounded-2xl p-6 shadow-xl border border-violet-200">
          <div className="flex items-center mb-6">
            <div className="bg-violet-100 p-3 rounded-full mr-3">
              <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-violet-800">Nouvelle Dépense</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-violet-700 font-medium mb-2" htmlFor="amount">
                  Montant (Ar)
                </label>
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 rounded-lg border border-violet-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-violet-700 font-medium mb-2" htmlFor="date">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  className="w-full px-4 py-3 rounded-lg border border-violet-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-violet-700 font-medium mb-2" htmlFor="description">
                Description
              </label>
              <input
                id="description"
                type="text"
                placeholder="Ex: Courses, Restaurant, Transport..."
                className="w-full px-4 py-3 rounded-lg border border-violet-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            {/* Type de dépense */}
            <div>
              <label className="block text-violet-700 font-medium mb-2">Type de dépense</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className={`px-4 py-3 rounded-lg border transition-all duration-200 ${
                    form.type === "one-time" 
                      ? "bg-violet-100 border-violet-500 text-violet-700 font-semibold" 
                      : "bg-white border-violet-300 text-violet-600 hover:border-violet-400"
                  }`}
                  onClick={() => setForm({...form, type: "one-time"})}
                >
                  Ponctuelle
                </button>
                <button
                  type="button"
                  className={`px-4 py-3 rounded-lg border transition-all duration-200 ${
                    form.type === "recurring" 
                      ? "bg-violet-100 border-violet-500 text-violet-700 font-semibold" 
                      : "bg-white border-violet-300 text-violet-600 hover:border-violet-400"
                  }`}
                  onClick={() => setForm({...form, type: "recurring"})}
                >
                  Récurrente
                </button>
              </div>
            </div>

            {/* Champs supplémentaires pour les dépenses récurrentes */}
            {form.type === "recurring" && (
              <div className="space-y-4 p-4 bg-violet-50 rounded-lg border border-violet-200">
                <div>
                  <label className="block text-violet-700 font-medium mb-2">Fréquence</label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border border-violet-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 bg-white"
                    value={form.recurrence}
                    onChange={(e) => setForm({ ...form, recurrence: e.target.value })}
                    required
                  >
                    <option value="monthly">Mensuelle</option>
                    <option value="quarterly">Trimestrielle</option>
                    <option value="yearly">Annuelle</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-violet-700 font-medium mb-2">Date de début</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-lg border border-violet-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    required
                  />
                  <p className="text-sm text-violet-500 mt-1">Date à laquelle la récurrence commence</p>
                </div>
                
                <div>
                  <label className="block text-violet-700 font-medium mb-2">Date de fin (optionnelle)</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-lg border border-violet-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    min={form.startDate}
                  />
                  <p className="text-sm text-violet-500 mt-1">Date jusqu'à laquelle la dépense se répète (laisser vide si sans fin)</p>
                </div>
              </div>
            )}

            {/* Catégorie */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-violet-700 font-medium">Catégorie</label>
                <button
                  type="button"
                  className="text-sm text-violet-600 hover:text-violet-800 flex items-center"
                  onClick={() => setShowCategoryModal(true)}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Nouvelle catégorie
                </button>
              </div>
              <select
                className="w-full px-4 py-3 rounded-lg border border-violet-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 bg-white"
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                required
              >
                <option value="">Choisissez une catégorie</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Ajouter la dépense
              </div>
            </button>
          </form>
        </div>

        {/* Liste des dépenses */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-violet-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-violet-100 p-3 rounded-full mr-3">
                <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-violet-800">Historique</h2>
            </div>
            <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">
              {expenses.length} dépense{expenses.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          {expenses.length === 0 ? (
            <div className="text-center py-10">
              <svg className="w-16 h-16 text-violet-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              <p className="text-violet-500">Aucune dépense enregistrée</p>
              <p className="text-violet-400 text-sm mt-1">Commencez par ajouter votre première dépense</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {expenses.map((exp) => (
                <div key={exp.id} className={`bg-violet-50 rounded-xl p-4 border transition-colors duration-200 ${
                  isOverdue(exp) 
                    ? "border-red-300 bg-red-50" 
                    : "border-violet-200 hover:border-violet-300"
                }`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span 
                          className="text-white px-2 py-1 rounded-full text-xs font-medium mr-2"
                          style={{ backgroundColor: exp.category?.color || "#3B82F6" }}
                        >
                          {exp.category ? exp.category.name : "Non catégorisé"}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          exp.type === "recurring" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {exp.type === "recurring" ? "Récurrente" : "Ponctuelle"}
                        </span>
                        {isOverdue(exp) && (
                          <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700 ml-2">
                            ⚠️ En retard
                          </span>
                        )}
                      </div>
                      <h3 className="font-medium text-violet-900 mb-1">
                        {exp.description || "Dépense sans description"}
                      </h3>
                      <p className="text-violet-500 text-sm">
                        {new Date(exp.date).toLocaleDateString('fr-FR')}
                      </p>
                      
                      {/* Informations supplémentaires pour les dépenses récurrentes */}
                      {exp.type === "recurring" && (
                        <div className="mt-2 text-xs text-violet-600 space-y-1">
                          <p>• Début: {new Date(exp.startDate).toLocaleDateString('fr-FR')}</p>
                          {exp.endDate && (
                            <p>• Fin: {new Date(exp.endDate).toLocaleDateString('fr-FR')}</p>
                          )}
                          <p>• Prochaine échéance: {getNextOccurrence(exp)}</p>
                          {exp.recurrence && (
                            <p>• Fréquence: {
                              exp.recurrence === "monthly" ? "Mensuelle" :
                              exp.recurrence === "quarterly" ? "Trimestrielle" :
                              exp.recurrence === "yearly" ? "Annuelle" : exp.recurrence
                            }</p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-violet-700">
                        {parseFloat(exp.amount).toFixed(2)} Ar
                      </div>
                      {exp.type === "recurring" && (
                        <div className="text-xs text-violet-500 mt-1">
                          {exp.recurrence === "monthly" ? "/mois" :
                           exp.recurrence === "quarterly" ? "/trimestre" :
                           exp.recurrence === "yearly" ? "/an" : ""}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Total des dépenses */}
      {expenses.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-violet-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Total des dépenses</h3>
              <p className="text-violet-100">Sur l'ensemble de vos transactions</p>
            </div>
            <div className="text-3xl font-bold">
              {expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0).toFixed(2)} Ar
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpensePage;