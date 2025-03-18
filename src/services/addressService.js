// src/services/addressService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/address/';

// Add authorization header to all requests
axios.interceptors.request.use(
    config => {
      const tokenData = localStorage.getItem('authToken');
      if (tokenData) {
        const { access } = JSON.parse(tokenData); // Extract the access token
        if (access) {
          config.headers['Authorization'] = `Bearer ${access}`;
        }
      }
      return config;
    },
    error => Promise.reject(error)
  );
  

const addressService = {
  // Get all addresses for the logged-in user
  getAddresses: async () => {
    try {
      const response = await axios.get(`${API_URL}create-get/`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Network error' };
    }
  },

  // Create a new address
  createAddress: async (addressData) => {
    try {
      const response = await axios.post(`${API_URL}create-get/`, addressData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Network error' };
    }
  },

  // Get a specific address by ID
  getAddressById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}detail/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Network error' };
    }
  },

  // Update an address
  updateAddress: async (id, addressData) => {
    try {
      const response = await axios.put(`${API_URL}detail/${id}/`, addressData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Network error' };
    }
  },

  // Delete an address
  deleteAddress: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}detail/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Network error' };
    }
  }
};

export default addressService;