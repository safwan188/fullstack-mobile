import axios from 'axios';

const API_URL = 'http://10.0.2.2:5000/api';

const apiUser = axios.create({
  baseURL: API_URL,
});



const LoginUser = (username, password) => {
  console.log(API_URL);
    return axios.post(`${API_URL}/users/login`, {
        username,
        password,
    });
    };



export default {
 
    LoginUser,

};