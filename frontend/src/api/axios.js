
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  withCredentials:true,
});

  
 API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('username');
      localStorage.removeItem('profileUrl')
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default API;