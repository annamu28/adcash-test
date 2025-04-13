import axios from 'axios';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true, // Important for CSRF token
});

// Function to fetch and set CSRF token
const fetchCsrfToken = async () => {
  try {
    await axios.get(`${API_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
    console.log('CSRF token fetched successfully');
    
    // Log all cookies to debug
    console.log('Cookies:', document.cookie);
    
    // Check for XSRF-TOKEN cookie
    const xsrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='));
    
    if (xsrfToken) {
      console.log('XSRF-TOKEN found:', xsrfToken);
      // Set the X-XSRF-TOKEN header for the next request
      api.defaults.headers.common['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken.split('=')[1]);
    } else {
      console.log('XSRF-TOKEN not found in cookies');
    }
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
  }
};

// Fetch CSRF token when the API is initialized
fetchCsrfToken();

// Add a request interceptor to ensure CSRF token is included
api.interceptors.request.use(async (config) => {
  // If we're making a request that requires CSRF protection
  if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')) {
    // Ensure we have a CSRF token
    await fetchCsrfToken();
  }
  return config;
});

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    await fetchCsrfToken(); // Ensure we have a fresh token
    const response = await api.post<AuthResponse>('/login', credentials);
    
    // Set the auth token if it's included in the response
    if (response.data.token) {
      setAuthToken(response.data.token);
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Login error:', error);
    // Extract error message from response if available
    const errorMessage = error.response?.data?.message || error.message || 'Login failed';
    throw new Error(errorMessage);
  }
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  try {
    await fetchCsrfToken(); // Ensure we have a fresh token
    const response = await api.post<AuthResponse>('/register', credentials);
    
    // Set the auth token if it's included in the response
    if (response.data.token) {
      setAuthToken(response.data.token);
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Register error:', error);
    // Extract error message from response if available
    const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
    throw new Error(errorMessage);
  }
};

export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}; 