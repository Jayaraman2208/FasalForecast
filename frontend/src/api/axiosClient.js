import axios from 'axios';
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => { console.error('API Error:', error); return Promise.reject(error); }
);
export default axiosClient;
