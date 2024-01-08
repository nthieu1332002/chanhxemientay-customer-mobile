import React, {useEffect, useState} from 'react';

import WelcomeScreen from 'screens/WelcomeScreen';
import LoginScreen from 'screens/LoginScreen';
import RegisterScreen from 'screens/RegisterScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from 'components/Loading';
const Stack = createNativeStackNavigator();
const AuthStack = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirst, setIsFirst] = useState(false);

  useEffect(() => {
    const checkFirst = async () => {
      const init = await AsyncStorage.getItem('INIT');
      console.log('init', init);
      if (init === null) {
        setIsFirst(true);
      }
      setIsLoading(false);
    };
    checkFirst();
  }, []);
  const handleStart = () => {
    setIsFirst(false);
    AsyncStorage.setItem('INIT', 'No');
  };
  if (isLoading) {
    return <Loading />;
  }
  if (isFirst) {
    return <WelcomeScreen onStart={handleStart} />;
  }
  if (!isFirst) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{animation: 'slide_from_right'}}
        />
      </Stack.Navigator>
    );
  }
};

const Auth = () => {
  return (
    <>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{animation: 'slide_from_right'}}
      />
    </>
  );
};

export default AuthStack;
