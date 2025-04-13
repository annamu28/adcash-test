import axios from 'axios';
import { Campaign, CreateCampaignData, UpdateCampaignStatusData, CampaignFilters } from '../types/campaign';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
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

// Add a request interceptor to ensure CSRF token and auth token are included
api.interceptors.request.use(async (config) => {
  // If we're making a request that requires CSRF protection
  if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')) {
    // Ensure we have a CSRF token
    await fetchCsrfToken();
  }

  // Get the auth token from localStorage
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getCampaigns = async (filters?: CampaignFilters): Promise<Campaign[]> => {
  try {
    const response = await api.get<Campaign[]>('/campaigns', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch campaigns:', error);
    throw error;
  }
};

export const createCampaign = async (data: CreateCampaignData): Promise<Campaign> => {
  try {
    await fetchCsrfToken(); // Ensure we have a fresh token
    const response = await api.post<Campaign>('/campaigns', data);
    return response.data;
  } catch (error) {
    console.error('Failed to create campaign:', error);
    throw error;
  }
};

export const updateCampaignStatus = async (
  id: number,
  data: UpdateCampaignStatusData
): Promise<Campaign> => {
  try {
    await fetchCsrfToken(); // Ensure we have a fresh token
    const response = await api.patch<Campaign>(`/campaigns/${id}/status`, data);
    return response.data;
  } catch (error) {
    console.error('Failed to update campaign status:', error);
    throw error;
  }
}; 