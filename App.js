import { SafeAreaView, Text, View } from "react-native"

import { AuthProvider } from "./SRC/Context/AuthContext";
import { NavigationContainer } from '@react-navigation/native';
import { OnBoardStackScreen } from './SRC/Navigation/StackNav';
import OnBoarding from './SRC/MainScreens/OnBoardingScreen/OnBoarding';
import React from 'react';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <SafeAreaView />
        <OnBoardStackScreen />
      </AuthProvider>
    </NavigationContainer>
  )
}

export default App;