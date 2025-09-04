import React, { useState } from 'react';
import API from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input ${name} changed to: "${value}" (length: ${value.length})`);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      const res = await API.post('/api/auth/signin', { email: form.username, password: form.password }); // Use email instead of username
      alert(res.data.message || 'Connexion réussie !');
      if (res.data.userId) localStorage.setItem('userId', res.data.userId);
      if (res.data.token) localStorage.setItem('token', res.data.token); // Store token
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Erreur serveur';
      console.error('Error details:', err.response || err);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupRedirect = () => navigate('/signup');

  const LeftPanel = () => (
    <div
      className="w-1/2 h-full flex flex-col items-center justify-center text-white px-10"
      style={{ backgroundImage: "url('/bg-left.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <h3 className="text-2xl font-bold mb-10">CodeSquid</h3>
      <img src="/login_Illustration.png" alt="Login Illustration" className="w-80 mb-10" />
      <h3 className="text-2xl font-semibold mb-4 text-center">
        Track & Manage Your <br /> Personal Expenses
      </h3>
      <p className="text-sm text-center max-w-md opacity-80">
        Easily monitor your income, expenses, and budget <br /> in one place.
      </p>
    </div>
  );

  const RightPanel = () => (
    <div className="w-1/2 h-full flex flex-col items-center justify-center px-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Sign In & Take Control of Your Finances
      </h2>
      <div className="flex gap-4 mb-6">
        <button className="flex items-center gap-2 border px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">
          <img src="/google.png" alt="Google" className="w-5 h-5" />
          <span>Sign in with Google</span>
        </button>
        <button className="flex items-center gap-2 border px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">
          <img src="/github.png" alt="Github" className="w-5 h-5" />
          <span>Sign in with Github</span>
        </button>
      </div>
      <form className="w-full max-w-sm flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Email"
          value={form.username}
          onChange={handleChange}
          className="border-b py-2 outline-none focus:border-purple-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border-b py-2 outline-none focus:border-purple-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-purple-500 text-white py-3 rounded-full shadow-lg hover:bg-purple-600 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Connexion...' : 'SIGN IN'}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
      <p className="text-sm mt-6">
        Don’t have an account?{' '}
        <span
          className="text-purple-500 font-semibold cursor-pointer hover:underline"
          onClick={handleSignupRedirect}
        >
          SIGN UP
        </span>
      </p>
    </div>
  );

  return (
    <div className="flex flex-row w-screen h-screen">
      <LeftPanel />
      <RightPanel />
    </div>
  );
};

export default Signin;