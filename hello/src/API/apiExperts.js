// src/services/apiExperts.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:5000/api/experts'; // Adjust to match your Express server's port and route

const createExpert = (expertData) => {
  return axios.post(API_URL, expertData);
};

const getAllExperts = () => {
  return axios.get(API_URL);
};
const getExpertbyusername =async () => {
  const token = await AsyncStorage.getItem('token');
  console.log(token);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
    return axios.get(`${API_URL}/expertbytz`, { headers });
};
const getExpertById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

const updateExpert = (id, updateData) => {
  return axios.put(`${API_URL}/${id}`, updateData);
};

const deleteExpert = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

// Additional function to get reports for a specific expert
const getExpertReports = (expertId) => {
  return axios.get(`${API_URL}/${expertId}/reports`);
};

export default {
  getExpertbyusername,
  createExpert,
  getAllExperts,
  getExpertById,
  updateExpert,
  deleteExpert,
  getExpertReports
};
