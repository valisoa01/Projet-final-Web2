import React, { useState } from 'react';
import API from '../../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
     if (!formData.email || !formData.password) {
      setError('Tous les champs obligatoires doivent être remplis');
      return;
    }

    try {
      setLoading(true);
      const res = await API.post('/auth/signin', formData, {
        headers: { 
          'Content-Type': 'application/json',
        },
        withCredentials:true
      });
      
      alert('Connexion réussie !');
      
       if (res.data.userId) {
        localStorage.setItem('userId', res.data.userId);
        localStorage.setItem('userEmail', res.data.email);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('profileUrl', res.data.profileUrl || '');
      }
      if(res.data.token) {
        localStorage.setItem('token', res.data.token);
        console.log('Token stocké dans localStorage (fallback');
        
      } else {
        console.log('Token géré par cookies');
        
      }  
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
          Welcome Back to Your <br /> Financial Hub
        </h3>
        <p className="text-sm text-center max-w-md opacity-80">
          Continue tracking your income, expenses, and budget <br /> in one place.
        </p>
      </div>

       <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign 
        </h2>
        
        <div className="flex gap-4 mb-6">
          <button 
            type="button"
            className="flex items-center gap-2 border px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
          >
            <span className="w-5 h-5 bg-blue-500 rounded-full"></span>
            <span>Sign in with Google</span>
          </button>
          <button 
            type="button"
            className="flex items-center gap-2 border px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
          >
            <span className="w-5 h-5 bg-gray-800 rounded-full cursor-pointer"></span>
            <span>Sign in with Github</span>
          </button>
        </div>
        
        <div className="relative w-full max-w-sm mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500 cursor-pointer">Or continue with email</span>
          </div>
        </div>
        
        <form className="w-full max-w-sm flex flex-col gap-4" onSubmit={handleSubmit}>
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
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                Forgot password?
              </a>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-purple-600 text-white py-3 rounded-lg shadow-lg hover:bg-purple-700 transition-colors mt-2 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Signing In...' : 'SIGN IN'}
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
          Don't have an account?{' '}
          <Link 
            to="/signup"
            className="text-purple-600 font-semibold cursor-pointer hover:underline "
          >
            SIGN UP
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;