// src/services/apiExperts.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/experts'; // Adjust to match your Express server's port and route

const createExpert = (expertData) => {
  return axios.post(API_URL, expertData);
};

const getAllExperts = () => {
  return axios.get(API_URL);
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
  createExpert,
  getAllExperts,
  getExpertById,
  updateExpert,
  deleteExpert,
  getExpertReports
};
