import {COLORS, FONTFAMILY, FONTS} from '../../../Constants/DesignConstants';
import {
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {getLocations, showToastGreen} from '../../../HelperFunctions/Helper';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import ActivityLoader from '../../../CustomComponents/ActivityLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../Context/AuthContext';
import Geolocation from '@react-native-community/geolocation';
import {RFValue} from 'react-native-responsive-fontsize';
import ResponsiveImage from 'react-native-responsive-image';
import {SvgXml} from 'react-native-svg';
import {getUserLocationInfo} from '../../../ApiService/API/LocationApi';
import {useNavigation} from '@react-navigation/native';
import {verifiedsvg} from '../../../Resources/Svg/Service';

const HospitalComponent = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const {GetHospitals, setLocationData, locationData} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState();

  const getData = async latlong => {
    // showToastGreen('called')
    // console.log(locationData, 'iiiiiiiii');
    const response = await GetHospitals(
      latlong?.latitude,
      latlong?.longitude,
      1,
    );
    console.log(response);
    if (response?.status === true) {
      setLoading(false);
      setData(response?.data);
      setPageCount(response?.data?.length);
    } else {
      setLoading(false);
      console.log(response, 'eee');
    }
  };

  const getData2 = async pagenum => {
    setLoading2(true);
    const response = await GetHospitals(lat, lang, pagenum);
    if (response?.status === true) {
      setLoading2(false);
      setData([...data, ...response?.data]);
      setPageCount(response?.data?.length);
    } else {
      setLoading2(false);
      console.log(response, 'eee');
    }
  };

  const loadMore = async () => {
    console.log(page);
    console.log(pageCount);
    if (pageCount === 10 && !loading2) {
      getData2(page + 1);
      setPage(page + 1);
    }
  };
  const startup = async () => {
    await requestLocationPermission();
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      await getOneTimeLocation();
      await subscribeLocationLocation();
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
          await getOneTimeLocation();
          await subscribeLocationLocation();
        } else {
          // setLocationStatus('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  // requestLocationPermission();
  // return () => {
  //   Geolocation.clearWatch(watchID);
  // };

  const getOneTimeLocation = async () => {
    // setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        // setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setLocationData(position.coords);
        getData(position?.coords);

        //Setting Longitude state
        // setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        // setCurrentLatitude(currentLatitude);
      },
      error => {
        // setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = async () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change

        // setLocationStatus('You are Here');
        console.log(position);

        const jsonValue = JSON.stringify(position.coords);
        AsyncStorage.setItem('location_details', jsonValue);
        // setLocationData(jsonValue);
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        // setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        // setCurrentLatitude(currentLatitude);
      },
      error => {
        // setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  useEffect(() => {
    // getData();
    startup();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.headtext, {marginStart: responsiveWidth(5)}]}>
        Nearby Healthcare Provider
      </Text>

      {!loading ? (
        <>
          {data?.length && data?.length > 0 ? (
            <ScrollView
              onScroll={loadMore}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{padding: 5}}>
              {data?.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ServiceLists', {hospitalData: item});
                  }}
                  key={index}
                  activeOpacity={0.8}
                  style={styles.card}>
                  <ResponsiveImage
                    style={styles.image}
                    source={{uri: item?.profile_photo}}
                  />

                  <View style={styles.bottomview}>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={styles.text1}>
                      {item.name}
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.text2}>
                      {item?.address}
                    </Text>
                  </View>
                  {item?.is_verified && (
                    <View
                      style={{
                        position: 'absolute',
                        right: responsiveWidth(1),
                        top: responsiveHeight(0.5),
                      }}>
                      <SvgXml
                        xml={verifiedsvg}
                        height={responsiveWidth(8)}
                        width={responsiveWidth(8)}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: responsiveHeight(2),
              }}>
              <Text style={styles.headtext}>No HealthCare Near You !</Text>
            </View>
          )}
        </>
      ) : (
        <ActivityLoader size={'large'} style={{height: responsiveHeight(20)}} />
      )}
    </View>
  );
};

export default HospitalComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: COLORS.white,
    width: responsiveWidth(48),
    height: responsiveHeight(19),
    alignSelf: 'center',
    elevation: 5,
    marginVertical: responsiveHeight(1),
    borderRadius: 10,
    borderColor: COLORS.primary,
    marginHorizontal: responsiveWidth(2),
    overflow: 'hidden',
  },
  headtext: {
    fontSize: RFValue(15),
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
    color: COLORS.black,
  },
  image: {
    width: responsiveWidth(48),
    height: responsiveHeight(10),
  },
  bottomview: {
    paddingHorizontal: 10,
    justifyContent: 'space-evenly',
    height: responsiveHeight(9),
  },
  text1: {
    color: COLORS.black,
    fontSize: RFValue(14),
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
    textAlign: 'center',
  },
  text2: {
    color: COLORS.gray,
    fontSize: RFValue(12),
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
    width: responsiveWidth(43),
    alignSelf: 'center',
  },
});
