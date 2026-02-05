import axios from 'axios';

// Si VITE_API_URL n'est pas défini (en local), on utilise localhost
// IMPORTANT : Sur Vercel, ta variable VITE_API_URL doit être https://projet-final-web2.onrender.com/api
const BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  withCredentials: true,
});
  
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
       localStorage.clear();
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// Exportez à la fois API et BASE_URL
export { BASE_URL };
export default API;