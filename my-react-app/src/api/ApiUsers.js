// src/services/apiUsers.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Adjust to match your Express server's port and route

const createUser = (userData) => {
  return axios.post(API_URL, userData);
};

const getAllUsers = () => {
  return axios.get(API_URL);
};

const getUserById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};
const LoginUser = (username, password) => {
    return axios.post(`${API_URL}/login`, {
        username,
        password,
    });
    };
const updateUser = (id, updateData) => {
  return axios.put(`${API_URL}/${id}`, updateData);
};

const deleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  LoginUser,
  updateUser,
  deleteUser
};