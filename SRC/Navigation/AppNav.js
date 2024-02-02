import {
  ActivityIndicator,
  PermissionsAndroid,
  StatusBar,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../Context/AuthContext';
import {COLORS} from '../Constants/DesignConstants';
import Drawer from './DrawerNavigation/Drawer';
import Geolocation from '@react-native-community/geolocation';
import {HomeStackScreen} from './StackNav';
import Routes from './Routes';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import {showToastGreen} from '../HelperFunctions/Helper';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import NoData from '../CustomComponents/NoData';

const AppNav = () => {
  const {
    UserDetails,
    isLoading,
    setLocationData,
    UserToken,
    netConnected,
    setNetConnected,
  } = useContext(AuthContext);

  const handleNetwork = state => {
    setNetConnected(state?.isConnected);
    if (!state.isConnected) {
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Check Your Internet Connection',
        autoHide: false,
        topOffset: 30,
        bottomOffset: 40,
      });
    } else {
      showToastGreen('Back Online')
      Toast.hide();
    }
  };

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(handleNetwork);
    return () => removeNetInfoSubscription();
  });
  // UserDetails="nnn";

  const [currentLongitude, setCurrentLongitude] = React.useState('...');
  const [currentLatitude, setCurrentLatitude] = React.useState('...');
  const [locationStatus, setLocationStatus] = React.useState('');

  if (isLoading) {
    return (
      <ActivityIndicator
        size={'large'}
        color={COLORS.primary}
        style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}
      />
    );
  }

  return (
    <>
      <StatusBar
        backgroundColor={netConnected ? COLORS.primary : 'red'}
        barStyle={'light-content'}
      />
      {UserToken === null ? <Routes /> : <Drawer />}
    </>
  );
};

export default AppNav;
