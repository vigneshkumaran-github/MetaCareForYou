import {HomeStackScreen, OnBoardStackScreen} from './SRC/Navigation/StackNav';
import {SafeAreaView, Text, View} from 'react-native';

import AppNav from './SRC/Navigation/AppNav';
import { AuthProvider} from './SRC/Context/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import OnBoarding from './SRC/MainScreens/OnBoardingScreen/OnBoarding';
import React, { useContext, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { LogLevel, OneSignal } from 'react-native-onesignal';

const App = () => {

  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize('5ddefafb-e6a7-48dd-b6e7-780eeba74f8a');
  // OneSignal.initialize('2830d598-d8ca-48a2-8b25-f300b616ef01');--

  // requestPermission will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  OneSignal.Notifications.requestPermission(true);

  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });
  
  return (
    <NavigationContainer>
      <AuthProvider>
        <SafeAreaView />
        <AppNav />
        <Toast />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
