import axios from 'axios';

// Adresa IP a computerului tău
const API_URL = 'http://192.168.100.1:5000/auth';

export const register = async (email, username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (token, oldPassword, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/change-password`, { oldPassword, newPassword }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
