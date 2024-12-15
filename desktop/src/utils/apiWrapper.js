import { toast } from 'vue-sonner';
import axios from 'axios';

export const ApiWrapper = async (url, body = {}) => {
  const token = localStorage.getItem('authToken') || import.meta.env.VITE_AUTH_TOKEN || null;
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!apiUrl) {
    console.error('API URL is not defined. Please check your environment variables.');
    toast.error('Configuration error. Please contact support.');
    throw new Error('API URL is not defined.');
  }

  try {
    const response = await axios.post(`${apiUrl}/${url}`, body, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return response.data;
  } catch (error) {
    const { response } = error;
    if (response?.status === 401) {
      toast.error('Session expired. Please log in again.');
    } else {
      const errorMessage = response?.data?.message || error.message || 'An unknown error occurred.';
      toast.error(errorMessage);
    }

    throw error;
  }
};
