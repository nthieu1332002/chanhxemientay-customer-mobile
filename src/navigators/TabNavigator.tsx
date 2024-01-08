import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../theme/theme';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import SearchListScreen from 'screens/SearchListScreen';
import ProfileScreen from 'screens/ProfileScreen';
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
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <AntDesign
              name="home"
              size={20}
              color={focused ? COLORS.primaryColor : COLORS.primaryGray}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 12,
                color: focused ? COLORS.primaryColor : COLORS.primaryGray,
                marginBottom: 5
              }}>
              Trang chủ
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchListScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <AntDesign
              name="search1"
              size={18}
              color={focused ? COLORS.primaryColor : COLORS.primaryGray}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 12,
                color: focused ? COLORS.primaryColor : COLORS.primaryGray,
                marginBottom: 5
              }}>
              Tra cứu
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="user-o"
              size={18}
              color={focused ? COLORS.primaryColor : COLORS.primaryGray}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? COLORS.primaryColor : COLORS.primaryGray,
                fontSize: 12,
                marginBottom: 5
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
    paddingVertical: 5,
    height: 50,
    borderTopWidth: 0.5,
  },
});

export default TabNavigator;
