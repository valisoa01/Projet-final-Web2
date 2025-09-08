import React, { useState } from 'react';
import API from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profile: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'profile') {
      setFormData({
        ...formData,
        profile: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
     if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Tous les champs obligatoires doivent être remplis');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas !');
      return;
    }
    
    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    
    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('confirmPassword', formData.confirmPassword);
    
    if (formData.profile) {
      formDataToSend.append('profile', formData.profile);
    }

    try {
      setLoading(true);
      const res = await API.post('/auth/signup', formDataToSend, {
        headers: { 
          'Content-Type': 'multipart/form-data',
        }
      });
      
      alert(res.data.message || 'Inscription réussie !');
      
       if (res.data.userId) {
        localStorage.setItem('userId', res.data.userId);
        localStorage.setItem('userEmail', res.data.email);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('profileUrl', res.data.profileUrl || '');
      }
      if (res.data.token) localStorage.setItem('token', res.data.token);
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur complète:', err);
      
      let errorMsg = 'Erreur serveur';
      if (err.response) {
        console.error('Détails de la réponse:', err.response);
        errorMsg = err.response.data?.error || err.response.data?.message || JSON.stringify(err.response.data);
      } else if (err.request) {
        console.error('Aucune réponse reçue:', err.request);
        errorMsg = 'Aucune réponse du serveur - vérifiez que le serveur est démarré';
      } else {
        console.error('Erreur de configuration:', err.message);
        errorMsg = err.message;
      }
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
       <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-700 to-indigo-900 flex flex-col items-center justify-center p-8 text-white">
        <h3 className="text-2xl font-bold mb-10">CodeSquid</h3>
        <div className="w-64 h-64 bg-purple-500 rounded-full mb-10 flex items-center justify-center text-6xl">🐙</div>
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Track & Manage Your <br /> Personal Expenses
        </h3>
        <p className="text-sm text-center max-w-md opacity-80">
          Easily monitor your income, expenses, and budget <br /> in one place.
        </p>
      </div>

       <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign Up & Take Control of Your Finances
        </h2>
        
        <div className="flex gap-4 mb-6">
          <button 
            type="button"
            className="flex items-center gap-2 border px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
          >
            <span className="w-5 h-5 bg-blue-500 rounded-full"></span>
            <span>Sign up with Google</span>
          </button>
          <button 
            type="button"
            className="flex items-center gap-2 border px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
          >
            <span className="w-5 h-5 bg-gray-800 rounded-full"></span>
            <span>Sign up with Github</span>
          </button>
        </div>
        
        <div className="relative w-full max-w-sm mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500">Or continue with email</span>
          </div>
        </div>
        
        <form className="w-full max-w-sm flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username *"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password *"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password *"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-gray-700">Profile Image (optional):</label>
            <input
              type="file"
              name="profile"
              onChange={handleChange}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              accept="image/*"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-purple-600 text-white py-3 rounded-lg shadow-lg hover:bg-purple-700 transition-colors mt-2 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating Account...' : 'SIGN UP'}
          </button>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">Erreur: {error}</p>
              <p className="text-red-500 text-xs mt-1">
                Ouvrez la console développeur (F12) pour plus de détails
              </p>
            </div>
          )}
        </form>
        
        <p className="text-sm mt-6 text-gray-600">
          Already have an account?{' '}
          <span 
            className="text-purple-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate('/signin')}
          >
            SIGN IN
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;