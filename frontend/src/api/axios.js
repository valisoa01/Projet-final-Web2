import axios from 'axios';

// On récupère l'URL de base. 
// Si VITE_API_URL est "https://projet-final-web2.onrender.com", on ajoute "/api"
// Si VITE_API_URL est déjà "https://projet-final-web2.onrender.com/api", on le laisse tel quel.
const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const BASE_URL = rawUrl.endsWith('/api') ? rawUrl : `${rawUrl}/api`;

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // Augmenté à 30s car Render Free Tier est lent au démarrage
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Ne redirige vers signin que si l'erreur n'est pas sur la page de login elle-même
    if (error.response?.status === 401 && !window.location.pathname.includes('/signin')) {
       localStorage.clear();
       window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export { BASE_URL };
export default API;