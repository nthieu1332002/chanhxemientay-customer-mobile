import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';
import TabNavigator from './src/navigators/TabNavigator';
import SearchScreen from 'screens/SearchScreen';
import SearchListScreen from 'screens/SearchListScreen';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BookingFormScreen from 'screens/BookingFormScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <BottomSheetModalProvider>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="Tab"
              component={TabNavigator}
              options={{animation: 'slide_from_bottom'}}></Stack.Screen>
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{animation: 'slide_from_bottom'}}></Stack.Screen>
            <Stack.Screen
              name="SearchList"
              component={SearchListScreen}
              options={{animation: 'slide_from_right'}}></Stack.Screen>
            <Stack.Screen
              name="BookingForm"
              component={BookingFormScreen}
              options={{animation: 'slide_from_right'}}></Stack.Screen>
          </Stack.Navigator>
        </BottomSheetModalProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
