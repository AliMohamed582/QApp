// src/api/client.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // not /auth
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('qapp_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
