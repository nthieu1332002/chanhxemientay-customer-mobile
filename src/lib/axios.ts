import Axios from 'axios';
import {BACKEND_API} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axios = Axios.create({
  baseURL: BACKEND_API,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axios.interceptors.request.use(
  async (config) => {
    try {

      const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.log('Error getting user session:', error);
    }
    return config;
  },
  (error) => {
    console.log('Error in request interceptor:', error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('Error in response interceptor:', error);
    return Promise.reject(error);
  }
);


export default axios;
