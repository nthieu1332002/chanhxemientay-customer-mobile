import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';
import TabNavigator from './src/navigators/TabNavigator';
import SearchScreen from 'screens/SearchScreen';
import SearchListScreen from 'screens/SearchListScreen';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BookingFormScreen from 'screens/BookingFormScreen';
import BookingSuccessScreen from 'screens/BookingSuccessScreen';
import {AuthProvider, useAuth} from 'context/AuthContext';
import LoginScreen from 'screens/LoginScreen';
import RegisterScreen from 'screens/RegisterScreen';
import {ToastProvider} from 'react-native-toast-notifications';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {ActivityIndicator, View} from 'react-native';
import {COLORS} from 'theme/theme';
import WelcomeScreen from 'screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <ToastProvider>
          <BottomSheetModalProvider>
            <Layout />
          </BottomSheetModalProvider>
        </ToastProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

export default App;

export const Layout = () => {
  const {accessToken, isLoading} = useAuth();
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.primaryColor} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {accessToken ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Tab"
            component={TabNavigator}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name="SearchList"
            component={SearchListScreen}
            options={{animation: 'slide_from_right'}}
          />
          <Stack.Screen
            name="BookingForm"
            component={BookingFormScreen}
            options={{animation: 'slide_from_right'}}
          />
          <Stack.Screen
            name="BookingSuccess"
            component={BookingSuccessScreen}
            options={{animation: 'slide_from_right'}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
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
      )}
    </NavigationContainer>
  );
};
