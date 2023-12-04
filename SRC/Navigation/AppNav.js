import { ActivityIndicator, PermissionsAndroid, StatusBar } from 'react-native';
import React, { useContext } from 'react';

import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { AuthContext } from '../Context/AuthContext';
import Geolocation from '@react-native-community/geolocation';
import { HomeStackScreen } from './StackNav';
import Routes from './Routes';
import Drawer from './DrawerNavigation/Drawer';
import { COLORS } from '../Constants/DesignConstants';

// import { LogLevel, OneSignal } from 'react-native-onesignal';









/* // Remove this method to stop OneSignal Debugging
OneSignal.Debug.setLogLevel(LogLevel.Verbose);

// OneSignal Initialization
OneSignal.initialize("2830d598-d8ca-48a2-8b25-f300b616ef01");

// requestPermission will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission
OneSignal.Notifications.requestPermission(true);

// Method for listening for notification clicks
OneSignal.Notifications.addEventListener('click', (event) => {
  console.log('OneSignal: notification clicked:', event);
}); */


const AppNav = () => {
    const { UserDetails,isLoading } = useContext(AuthContext)
    // const isLoading = false;
    // UserDetails="nnn";

    const [
    currentLongitude,
    setCurrentLongitude
  ] = React.useState('...');
  const [
    currentLatitude,
    setCurrentLatitude
  ] = React.useState('...');
  const [
    locationStatus,
    setLocationStatus
  ] = React.useState('');

  console.log(locationStatus)

  React.useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = 
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID =  Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change
        
        setLocationStatus('You are Here');
        console.log(position);

        const jsonValue = JSON.stringify(position.coords)
        AsyncStorage.setItem('location_details', jsonValue);

        //getting the Longitude from the location json        
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };

    if (isLoading) {
        return (
            <ActivityIndicator
                size={'large'}
                color={COLORS.primary}
                style={{ flex: 1, alignSelf: 'center', justifyContent: 'center', }}
            />
        );
    }

    return (
        UserDetails === null ? <Routes /> : <Drawer />
    );
};

export default AppNav;
