import React, { useState } from 'react';
import API from '../../api/axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profile: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Gestion des changements de champs
  const handleChange = (e) => {
    if (e.target.name === 'profile') {
      setForm({ ...form, profile: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des mots de passe
    if (form.password !== form.confirmPassword) {
      alert('Les mots de passe ne correspondent pas !');
      return;
    }

    // Création de FormData pour l'upload d'image
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) formData.append(key, form[key]);
    });

    try {
      setLoading(true);
      // Appel à l'API
      const res = await API.post('/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert(res.data.message || 'Inscription réussie !');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Erreur serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">S'inscrire</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
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
          placeholder="Password"
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="file"
          name="profile"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Inscription...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register;
