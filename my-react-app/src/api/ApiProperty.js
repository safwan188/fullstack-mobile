// src/api/apiProperties.js

import axios from 'axios';

// Set the base URL for all Axios requests for properties
const API_URL = 'http://localhost:5000/api/property';

// Create an instance of axios with the base URL
const axiosInstance = axios.create({
  baseURL: API_URL
});
// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  // Get token from localStorage
  const token = localStorage.getItem('token');
  console.log(token);
  // If the token exists, add it to the headers
  if (token) {
    config.headers['Authorization'] = `Bearer `+ token;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

const createProperty = (propertyData) => {
  return axiosInstance.post('/', propertyData);
};

const getAllProperties = () => {
  return axiosInstance.get('');
};

const getPropertyById = (id) => {
  return axiosInstance.get(`/${id}`);
};

const updateProperty = (id, updateData) => {
  return axiosInstance.put(`/${id}`, updateData);
};

const deleteProperty = (id) => {
  return axiosInstance.delete(`/${id}`);
};

export default {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
};
