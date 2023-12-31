import { HomeStackScreen, OnBoardStackScreen } from './SRC/Navigation/StackNav';
import { SafeAreaView, Text, View } from "react-native"

import AppNav from "./SRC/Navigation/AppNav";
import { AuthProvider } from "./SRC/Context/AuthContext";
import { NavigationContainer } from '@react-navigation/native';
import OnBoarding from './SRC/MainScreens/OnBoardingScreen/OnBoarding';
import React from 'react';
import  Toast  from 'react-native-toast-message';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <SafeAreaView />
        <Toast />
        <AppNav />
      </AuthProvider>
    </NavigationContainer>
  )
}

export default App;