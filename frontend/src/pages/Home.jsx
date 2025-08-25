import React from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await API.post('/auth/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur serveur');
    }
  };

  return (
    <div>
      <h2>Bienvenue {user.username}</h2>
      <p>Email: {user.email}</p>
      {user.profileUrl && <img src={user.profileUrl} alt="Profile" width={100} />}
      <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
}

export default Home;