// src/services/apiCustomers.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/customers'; // Adjust to match your Express server's port and route

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const createCustomer = (customerData) => {
  return axiosInstance.post('', customerData);
};


const getAllCustomers = () => {
  return axiosInstance.get(API_URL);
};
const getPropertiesForCustomer = (customerId) => {
  return axiosInstance.get(`${API_URL}/${customerId}/properties`);
};
const getCustomerById = (id) => {
  return axiosInstance.get(`${API_URL}/${id}`);
};
const createCustomerAndProperty = (customerPropertyData) => {
  return axiosInstance.post(`${API_URL}/customerandproperty`, customerPropertyData);
};
const updateCustomer = (id, updateData) => {
  return axiosInstance.put(`${API_URL}/${id}`, updateData);
};

const deleteCustomer = (id) => {
  return axiosInstance.delete(`${API_URL}/${id}`);
};

export default {
  createCustomer,

  getAllCustomers,
  getCustomerById,
  getPropertiesForCustomer,
  createCustomerAndProperty,
  updateCustomer,
  deleteCustomer
};
