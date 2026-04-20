import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const axiosInstance= axios.create({
  baseURL: BASE_URL,  
  timeout: 10000,  
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor (Add Authorization Token to Headers)
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response Interceptor (Handle global errors or responses)
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // Handle unauthorized access, possibly redirect to login
      
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
