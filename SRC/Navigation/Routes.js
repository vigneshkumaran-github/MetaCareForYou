import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthStackScreen, OnBoardStackScreen} from './StackNav';

import React, {useEffect, useState} from 'react';

const Routes = () => {
  const alreadyLaunched = true;
  const [firstLaunch, setFirstLaunch] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
        console.log(value)
      if (value == null) {
        setFirstLaunch(true);
      } else {
        setFirstLaunch(false);
      }
    });
  }, [firstLaunch]);

  if (firstLaunch === null) {
    return null;
  } else if (firstLaunch === true) {
    return <OnBoardStackScreen />;
  } else {
    return <AuthStackScreen />;
  }
};

export default Routes;
