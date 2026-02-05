import axios from 'axios';

// On utilise directement la variable sans faire de .replace()
const apiBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const API = axios.create({
  baseURL: apiBaseURL,
  timeout: 30000,
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

export default API;