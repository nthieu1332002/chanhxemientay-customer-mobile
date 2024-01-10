import TabNavigator from './TabNavigator';
import SearchScreen from 'screens/SearchScreen';
import SearchListScreen from 'screens/SearchListScreen';
import BookingFormScreen from 'screens/BookingFormScreen';
import BookingSuccessScreen from 'screens/BookingSuccessScreen';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import OrderDetailScreen from 'screens/OrderDetailScreen';
import TabDrawer from './TabDrawer';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const AppStack = () => {
  return (
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
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{animation: 'slide_from_right'}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
