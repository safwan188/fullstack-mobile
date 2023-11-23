// src/services/apiUsers.js

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL+'/api/users'; // Adjust to match your Express server's port and route




const LoginUser = (username, password) => {
    return axios.post(`${API_URL}/login`, {
        username,
        password,
    });
    };

export default {

  LoginUser,

};