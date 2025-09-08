import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Check, AlertCircle, Coffee, ShoppingCart, Car, Home } from 'lucide-react';
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
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (error) setError('');
    if (success) setSuccess('');
    if (name === 'profile') setFormData({ ...formData, profile: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('confirmPassword', formData.confirmPassword);
    if (formData.profile) formDataToSend.append('profile', formData.profile);

    try {
      setLoading(true);
      const res = await API.post('/auth/signup', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess(res.data.message || 'Account created! Redirecting...');
      if (res.data.token) localStorage.setItem('token', res.data.token);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { icon: <Coffee className="w-10 h-10 text-cyan-300" />, label: 'Coffee', bg: 'bg-indigo-700/40' },
    { icon: <ShoppingCart className="w-10 h-10 text-cyan-300" />, label: 'Shopping', bg: 'bg-indigo-600/40' },
    { icon: <Car className="w-10 h-10 text-cyan-300" />, label: 'Transport', bg: 'bg-indigo-500/40' },
    { icon: <Home className="w-10 h-10 text-cyan-300" />, label: 'Housing', bg: 'bg-indigo-400/40' }
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 relative overflow-hidden">
      
      {/* Animated circles behind everything */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400/30 rounded-full animate-bounceSlow"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-cyan-500/25 rounded-full animate-pingSlow"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-cyan-300/20 rounded-full animate-pulseSlow"></div>
        <div className="absolute bottom-40 right-16 w-8 h-8 bg-cyan-400/30 rounded-full animate-bounceSlow"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-300/20 rounded-full animate-spinSlow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-cyan-500/15 rounded-full animate-spinReverse"></div>
      </div>

      {/* Left Side: Floating Cards */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center gap-6 p-12 relative z-10">
        <h2 className="text-4xl font-bold text-cyan-300 mb-6">Track Your Expenses</h2>
        <div className="grid grid-cols-2 gap-6">
          {cards.map((c, idx) => (
            <div 
              key={idx} 
              className={`${c.bg} p-6 rounded-2xl flex flex-col items-center shadow-lg transform transition-all duration-500 hover:scale-110 hover:rotate-3 motion-safe:animate-pulseSlow hover:shadow-2xl hover:shadow-cyan-500/50 cursor-pointer`}
            >
              {c.icon}
              <span className="text-white font-bold mt-3">{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="w-full max-w-md bg-indigo-900/30 p-8 rounded-3xl shadow-2xl backdrop-blur-sm">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-cyan-300 mb-2">ExpenseTracker</h1>
            <p className="text-white text-sm">Create your account to start tracking your expenses</p>
          </div>

          {success && <div className="bg-green-500/20 p-3 rounded mb-4 text-white flex items-center gap-2"><Check className="w-5 h-5"/> {success}</div>}
          {error && <div className="bg-red-500/20 p-3 rounded mb-4 text-white flex items-center gap-2"><AlertCircle className="w-5 h-5"/> {error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"/>
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="w-full pl-12 py-3 rounded-xl bg-indigo-700/40 text-white outline-none"/>
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"/>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full pl-12 py-3 rounded-xl bg-indigo-700/40 text-white outline-none"/>
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"/>
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full pl-12 py-3 rounded-xl bg-indigo-700/40 text-white outline-none"/>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">{showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}</button>
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"/>
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="w-full pl-12 py-3 rounded-xl bg-indigo-700/40 text-white outline-none"/>
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">{showConfirmPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}</button>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 bg-cyan-500 rounded-xl text-white font-bold">{loading ? "Creating..." : "Create Account"}</button>

            <p className="text-white text-center mt-3">Already have an account? <span onClick={() => navigate('/signin')} className="text-cyan-300 cursor-pointer hover:text-white">Sign In</span></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
