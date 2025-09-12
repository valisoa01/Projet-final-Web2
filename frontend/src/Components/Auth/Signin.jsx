import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Check, AlertCircle, Github, DollarSign, CreditCard, PiggyBank, PieChart } from 'lucide-react';
import API from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (error) setError('');
    if (success) setSuccess('');
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      const res = await API.post('/auth/signin', formData);
      setSuccess(res.data.message || 'Login successful! Redirecting...');
      if (res.data.token) localStorage.setItem('token', res.data.token);
      if (res.data.userId) localStorage.setItem('userId', res.data.userId);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  const icons = [
    { icon: <DollarSign className="w-10 h-10 text-cyan-300"/>, label: 'Finance' },
    { icon: <CreditCard className="w-10 h-10 text-cyan-300"/>, label: 'Payments' },
    { icon: <PiggyBank className="w-10 h-10 text-cyan-300"/>, label: 'Savings' },
    { icon: <PieChart className="w-10 h-10 text-cyan-300"/>, label: 'Expenses' },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 relative overflow-hidden">


      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative gap-6">

        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-500/30 rounded-full animate-bounce"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-cyan-400/30 rounded-full animate-ping"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-cyan-300/30 rounded-full animate-pulse"></div>
        </div>

        <h2 className="text-4xl font-bold text-cyan-300 mb-4 relative z-10">Welcome Back!</h2>
        <p className="text-white text-lg mb-6 text-center max-w-sm relative z-10">
          Sign in to manage your expenses, track your progress, and stay on top of your finances.
        </p>

        <div className="grid grid-cols-2 gap-6 relative z-10">
          {icons.map((c, idx) => (
            <div key={idx} className="w-24 h-24 bg-indigo-500/40 rounded-2xl flex flex-col items-center justify-center shadow-lg transform transition-all duration-500 hover:scale-110 hover:rotate-3 animate-pulse cursor-pointer">
              {c.icon}
              <span className="text-white font-bold mt-2">{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="w-full max-w-md bg-indigo-900/30 p-8 rounded-3xl shadow-2xl backdrop-blur-sm">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-cyan-300 mb-2">ExpenseTracker</h1>
            <p className="text-white text-sm">Sign in to continue</p>
          </div>

          {success && <div className="bg-green-500/20 p-3 rounded mb-4 text-white flex items-center gap-2"><Check className="w-5 h-5"/> {success}</div>}
          {error && <div className="bg-red-500/20 p-3 rounded mb-4 text-white flex items-center gap-2"><AlertCircle className="w-5 h-5"/> {error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"/>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full pl-12 py-3 rounded-xl bg-indigo-700/40 text-white outline-none"/>
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"/>
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full pl-12 py-3 rounded-xl bg-indigo-700/40 text-white outline-none"/>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">{showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}</button>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 bg-cyan-500 rounded-xl text-white font-bold">{loading ? "Signing in..." : "Sign In"}</button>

            <p className="text-white text-center mt-3">Don't have an account? <span onClick={() => navigate('/signup')} className="text-cyan-300 cursor-pointer hover:text-white">Sign Up</span></p>
          </form>

     
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-xl py-3 px-4 text-white text-sm font-medium transition-all duration-300">
           
              <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
                <path fill="#4285F4" d="M533.5 278.4c0-18.9-1.5-37-4.4-54.6H272v103.4h147.4c-6.4 34.3-25.7 63.4-54.6 82.9v68h88.3c51.5-47.5 81.4-117.2 81.4-199.7z"/>
                <path fill="#34A853" d="M272 544.3c73.7 0 135.5-24.5 180.7-66.4l-88.3-68c-24.5 16.5-55.7 26-92.4 26-71 0-131-47.9-152.5-112.2H29v70.5C74.2 486.1 166.5 544.3 272 544.3z"/>
                <path fill="#FBBC05" d="M119.5 321.2c-10-29.3-10-61 0-90.3V160.4H29c-38.6 75.9-38.6 166.1 0 242l90.5-80.2z"/>
                <path fill="#EA4335" d="M272 107.3c39.9-.6 77.1 14.2 105.7 40.9l79.2-79.2C406.8 24.3 344.7-.6 272 0 166.5 0 74.2 58.2 29 145.7l90.5 80.5C141 155.2 201 107.3 272 107.3z"/>
              </svg>
              Google
            </button>

            <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-xl py-3 px-4 text-white text-sm font-medium transition-all duration-300">
              <Github className="w-4 h-4"/>
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
