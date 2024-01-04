import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../theme/theme';
import HomeScreen from '../screens/HomeScreen';
// import FavoritesScreen from '../screens/FavoritesScreen';
// import CartScreen from '../screens/CartScreen';
// import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchListScreen from 'screens/SearchListScreen';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
      }}>
      <Tab.Screen
        name="Trang chủ"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="home"
              size={30}
              color={focused ? COLORS.primaryColor : COLORS.primaryGray}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? COLORS.primaryColor : COLORS.primaryGray,
              }}>
              {' '}
              Trang chủ
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Tra cứu"
        component={SearchListScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="search"
              size={25}
              color={focused ? COLORS.primaryColor : COLORS.primaryGray}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? COLORS.primaryColor : COLORS.primaryGray,
              }}>
              Tra cứu
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Tài khoản"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="user"
              size={30}
              color={focused ? COLORS.primaryColor : COLORS.primaryGray}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? COLORS.primaryColor : COLORS.primaryGray,
              }}>
              Tài khoản
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 60,
    borderTopWidth: 0,
    elevation: 0,
  },
});

export default TabNavigator;
