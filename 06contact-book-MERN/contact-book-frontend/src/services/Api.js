import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8020//api/contact', 
});

export default api;
