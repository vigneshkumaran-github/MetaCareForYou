import {
  Alert,
  BackHandler,
  Dimensions,
  Linking,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {
  FindDoctorComponent,
  GetCareComponent,
  GetHelpComponent,
  HeaderComponent,
  QuestionsComponent,
  TopDoctors,
} from './Components';
import React, {useContext, useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../Context/AuthContext';
import {COLORS} from '../../Constants/DesignConstants';
import DeviceInfo from 'react-native-device-info';
// import HospitalComponent from './Components/HospitalComponent';
// import SpecialistComponent from './Components/SpecialistComponent';
import Banner2 from './Components/Banner2';
import HospitalComponent from './Components/HospitalComponent';

const Home = () => {
  const [headerlocation, setHeaderLoaction] = useState({});
  const {profileData, setProfileData, GetProfile,GetBanners,CheckVersion} = useContext(AuthContext);
  const Version = DeviceInfo.getVersion();
  const [loading,setLoading] = useState(true)
  const [bannerData,setBannerData] = useState()
  const [banner1,setBanner1] = useState([])
  const [banner2,setBanner2] = useState([]);
  const [loading2,setLoading2] = useState(true)


  const SetbasicDetails = async () => {
    //to get profile Details
    const response = await GetProfile();
    // console.log(response)
    if (response?.status === true) {
      setProfileData(response?.data);
      setLoading(false);
    } else {
      console.log(response, 'eee');
      setLoading(false);
    }
    //To get location details
  };

  const updateApp = async () => {
    Alert.alert(
      'Please Update',
      'You will have to update your app to the latest version to continue using.',
      [
        {
          text: 'update',
          onPress: () => {
            BackHandler.exitApp();
            if (Platform.OS === 'android') {
              Linking.openURL(
                'https://play.google.com/store/apps/details?id=com.metacareforyou',
              );
            } else {
              Linking.openURL('https://apps.apple.com/in/app');
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const checkVersion = async () => {
    const result = await CheckVersion(Platform.OS, Version)
    // console.log(result)
    if (result?.status === true) {
      if (result?.data?.version === true) {
        SetbasicDetails()
        getBanners()
      }
      else {
        updateApp()
      }
    }
    else {

    }

  }

  const getBanners = async () => {
    const response = await GetBanners();
    console.log(response);
    if (response?.status === true) {
      setBannerData(response?.data);
      console.log(response?.data)
      response?.data?.top_banner?.map((item, index) => {
        let arr = banner1;
        arr.push(item.image);
        setBanner1(arr);
      });

      // second banner
      response?.data?.middle_banner?.map((item, index) => {
        let arr = banner2;
        arr.push(item.image);
        setBanner2(arr);
      });
      setLoading2(false);
    } else {
      setLoading2(false);
    }
  };




  useEffect(() => {
    checkVersion();
  }, []);

  return (
    <SafeAreaView style={[styles.SafeAreaView,{backgroundColor:COLORS.white}]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
      <ScrollView>
        <HeaderComponent data={profileData} location={headerlocation} />
        {/* <SpecialistComponent /> */}
       <TopDoctors banner={banner1} data={bannerData?.top_banner} isLoading={loading2} /> 
       <HospitalComponent />
        {/* <FindDoctorComponent /> */}
        <GetCareComponent />
        <Banner2 banner={banner2} data={bannerData?.middle_banner} isLoading={loading2} /> 
        {/*  */}
        {/* <IssuesComponent /> */}
        <GetHelpComponent />
        {/*  */}
        {/* <OnlineDoctorsComponent /> */}
        <QuestionsComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
