import axios from 'axios';

const API_URL = 'http://10.0.2.2:5000/api';

const apiUser = axios.create({
  baseURL: API_URL,
});

const createUser = (userData) => {
  return apiUser.post('/users', userData);
};

const getAllUsers = () => {
  return apiUser.get('/users');
};
const LoginUser = (username, password) => {
    return axios.post(`${API_URL}/users/login`, {
        username,
        password,
    });
    };
const getUserById = (id) => {
  return apiUser.get(`/users/${id}`);
};

const updateUser = (id, updateData) => {
  return apiUser.put(`/users/${id}`, updateData);
};

const deleteUser = (id) => {
  return apiUser.delete(`/users/${id}`);
};

export default {
  createUser,
  getAllUsers,
    LoginUser,
  getUserById,
  updateUser,
  deleteUser,
};