import Axios from 'axios';
import Config from "react-native-config";
const axios = Axios.create({
  baseURL: Config.BACKEND_API,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axios.interceptors.request.use(
  async (config) => {
    try {
      // Implement your logic to get the user session in React Native
      // For example, you might use AsyncStorage or some other method
      const accessToken = await getAccessToken();
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

const getAccessToken = async () => {
  // Implement your logic to get the user's access token in React Native
  // For example, you might use AsyncStorage or some other method
  return 'YOUR_ACCESS_TOKEN';
};

export default axios;
