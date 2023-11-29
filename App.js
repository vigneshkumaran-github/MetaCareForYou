import * as React from 'react';

import { Text, View } from "react-native"

import { NavigationContainer } from '@react-navigation/native';
import { OnBoardStackScreen } from './SRC/Navigation/StackNav';
import OnBoarding from './SRC/MainScreens/OnBoardingScreen/OnBoarding';

const App=()=>{
  return(
    <NavigationContainer>
      <OnBoardStackScreen />
    </NavigationContainer>
  )
}

export default App;