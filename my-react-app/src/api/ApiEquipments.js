// src/api/apiEquipments.js

import axios from 'axios';

// Set the base URL for all Axios requests
const API_URL = 'http://localhost:5000/api/equipment';

// Create an instance of axios with the base URL
const axiosInstance = axios.create({
  baseURL: API_URL
});

const createEquipment = (equipmentData) => {
  return axiosInstance.post('/', equipmentData);
};

const getAllEquipments = () => {
  return axiosInstance.get('');
};

const getEquipmentById = (id) => {
  return axiosInstance.get(`/${id}`);
};

const updateEquipment = (id, updateData) => {
  return axiosInstance.put(`/${id}`, updateData);
};

const deleteEquipment = (id) => {
  return axiosInstance.delete(`/${id}`);
};

export default {
  createEquipment,
  getAllEquipments,
  getEquipmentById,
  updateEquipment,
  deleteEquipment
};
