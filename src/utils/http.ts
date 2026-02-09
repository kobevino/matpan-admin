import axios from 'axios';

const http = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - attach auth token
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - error handling
http.interceptors.response.use(
  (response) => response,
  (error) => {
    // Skip redirect for login request - let the login page handle auth errors
    const isLoginRequest = error.config?.url?.includes('/admins/login');
    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default http;
