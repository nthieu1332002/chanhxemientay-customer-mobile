import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AuthProvider, useAuth} from 'context/AuthContext';
import {ToastProvider} from 'react-native-toast-notifications';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppStack from 'navigators/AppStack';
import AuthStack from 'navigators/AuthStack';
import Loading from 'components/Loading';

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
      <Loading/>
    );
  }
  return (
    <NavigationContainer>
      {accessToken ? (
        <AppStack/>
      ) : (
        <AuthStack/>
      )}
    </NavigationContainer>
  );
};
