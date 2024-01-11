import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'lib/axios';
import React, {createContext, useContext, useEffect, useState} from 'react';

type UserInfoProps = {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
};

type AuthProps = {
  accessToken?: string;
  userInfo?: UserInfoProps;
  login: (email: string, password: string) => Promise<any>;
  register: (
    name: string,
    phone: string,
    email: string,
    password: string,
  ) => Promise<any>;
  update: (email: string, name: string, phone: string) => Promise<any>;
  logout: () => void;
  isLoading?: boolean;
};

const AuthContext = createContext<AuthProps>({
  login: async () => {},
  register: async () => {},
  update: async () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string>();
  const [userInfo, setUserInfo] = useState<UserInfoProps>();
  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        setIsLoading(true);

        const token = await AsyncStorage.getItem('ACCESS_TOKEN');
        const user = await AsyncStorage.getItem('USER_INFO');
        if (token && user) {
          setAccessToken(token);
          setUserInfo(JSON.parse(user));
        }
        setIsLoading(false);
      } catch (error) {
        setAccessToken(undefined);
        console.log('isLoggedIn error:', error);
      }
    };
    isLoggedIn();
  }, []);

  const update = async (email: string, name: string, phone: string) => {
    try {
      const data = {...userInfo, email, name, phone};
      setUserInfo(data);
      AsyncStorage.setItem('USER_INFO', JSON.stringify(data));
    } catch (error) {
      console.log('error', error);
    }
  };

  const login = async (indentifier: string, password: string) => {
    try {
      setIsLoading(true);
      const res = await axios.post('/login/token', {
        indentifier: indentifier,
        password: password,
        device_name: 'customer_mobile',
      });
      const access_token = res.data.data.access_token;
      const user = res.data.data.customer;
      setUserInfo(user);
      setAccessToken(access_token);

      AsyncStorage.setItem('USER_INFO', JSON.stringify(user));
      AsyncStorage.setItem('ACCESS_TOKEN', access_token);
      return {error: false};
    } catch (error) {
      setUserInfo(undefined);
      setAccessToken(undefined);
      return {error: true, msg: 'Sai thông tin đăng nhập'};
    } finally {
      setIsLoading(false);
    }
  };
  const register = async (
    name: string,
    phone: string,
    email: string,
    password: string,
  ) => {
    try {
      setIsLoading(true);
      const res = await axios.post('/register', {
        name,
        phone,
        email,
        password,
        password_confirmation: password,
        device_name: 'customer_mobile',
      });
      const access_token = res.data.data.access_token;
      const user = res.data.data.customer;
      if (res.data.data) {
        setUserInfo(user);
        setAccessToken(access_token);

        AsyncStorage.setItem('USER_INFO', JSON.stringify(user));
        AsyncStorage.setItem('ACCESS_TOKEN', access_token);
      }
      return {error: false};
    } catch (error: any) {
      return {error: true, msg: 'Đăng ký thất bại!'};
    } finally {
      setIsLoading(false);
    }
  };
  const logout = () => {
    setIsLoading(true);
    setAccessToken(undefined);
    setUserInfo(undefined);
    AsyncStorage.removeItem('USER_INFO');
    AsyncStorage.removeItem('ACCESS_TOKEN');
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        update,
        isLoading,
        accessToken,
        userInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
