import axios from 'axios';

const API_URL = 'https://localhost:7227/api/Auth';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error
      throw error.response.data;
    } else if (error.request) {
      // Request made but no response
      throw { success: false, message: 'Unable to connect to server' };
    } else {
      // Something else happened
      throw { success: false, message: 'An unexpected error occurred' };
    }
  }
};

export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    return { status: 'offline' };
  }
};