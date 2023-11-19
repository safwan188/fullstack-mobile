// src/services/apiReports.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:5000/api/reports';

const apiClient = axios.create({
  baseURL: API_URL,
});

const createReport = (reportData) => {
  return apiClient.post('/', reportData);
};


const getAllReports = async () => {
  const token = await AsyncStorage.getItem('token');
  return apiClient.get('/', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const getReportById = (id) => {
  return apiClient.get(`/${id}`);
};

const updateReport = (id, updateData) => {
  console.log(API_URL+`/findings/${id}`);
  return apiClient.put(`/findings/${id}`, updateData);
};

const deleteReport = (id) => {
  return apiClient.delete(`/${id}`);
};
const getReportsByExpertId = (id) => {
  return apiClient.get(`/reportsbyexpert/${id}`);
};
export default {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
  getReportsByExpertId

};
