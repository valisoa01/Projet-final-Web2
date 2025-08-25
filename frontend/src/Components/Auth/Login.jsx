import React, { useState } from 'react';
import API from '../../api/axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Gestion des changements de champs
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Appel à l'API backend
      const res = await API.post('/auth/login', form);

      // Stockage des informations dans localStorage
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      alert('Connexion réussie !');
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Erreur serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-green-500 text-white p-2 rounded hover:bg-green-600 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Connexion...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
