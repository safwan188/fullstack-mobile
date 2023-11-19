import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:5000/api/expertrequests';

const apiRequests = axios.create({
  baseURL: API_URL,
});

const createRequest = async (requestData) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return apiRequests.post('/', requestData, { headers });
};
export default {
    createRequest,
};