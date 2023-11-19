
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/expertrequests'; // Adjust to match your Express server's port and route

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
    const getAllExpertRequests = () => {
        return axiosInstance.get(API_URL);
    }
    const assigExpert = (id) => {
        return axiosInstance.put(`${API_URL}/${id}/assignexpert`);
    };
    export default {    
        getAllExpertRequests,
        assigExpert
    };