// src/services/apiReports.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reports'; // Adjust to match your Express server's port and route

// Create an axios instance
const api = axios.create({
  baseURL: API_URL
});

// Add a request interceptor
api.interceptors.request.use((config) => {
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

const createReport = (reportData) => {
  return api.post(API_URL, reportData);
};

const getAllReports = () => {
  return api.get(API_URL);
};

const getReportById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

const updateReport = (id, updateData) => {
  return api.put(`${API_URL}/${id}`, updateData);
};

const deleteReport = (id) => {
  return api.delete(`${API_URL}/${id}`);
};
const assigExpert = (id,data) => {
    return api.put(`${API_URL}/updatestatus/${id}`,data);
};
export default {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
  assigExpert

};