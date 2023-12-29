import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';
import TabNavigator from './src/navigators/TabNavigator';
import SearchScreen from 'screens/SearchScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{animation: 'slide_from_bottom'}}></Stack.Screen>
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{animation: 'slide_from_bottom'}}></Stack.Screen>
        {/* <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{animation: 'slide_from_bottom'}}></Stack.Screen>
           */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
