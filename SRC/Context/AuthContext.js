import React, {createContext, useContext, useEffect, useState} from 'react';
import {showToastGreen, showToastRed} from '../HelperFunctions/Helper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Authprovider} from './AuthContext';
import {BASE_URL} from '../ApiService/Config';
import apiCall from '../ApiService/API/index';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  // const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [UserDetails, setUserDetails] = useState(null);
  const [UserOption, setUserOption] = useState();
  const [profilePhoto, setProfilePhoto] = useState('');
  const [profileData, setProfileData] = useState();
  const [locationData, setLocationData] = useState();
  const [netConnected,setNetConnected] = useState(null)
  let a = 'HELLO';
  const [UserToken, setUserToken] = useState(null);

  const LoginApi = async (email, password) => {
    try {
      console.log('REQUEST>>', email, password);
      const response = await axios.post(`${BASE_URL}/auth/customer-login`, {
        email: email,
        password: password,
      });
      if (response.data?.status) {
        showToastGreen(response?.data?.message);
        await AsyncStorage.setItem(
          'userToken',
          response.data?.data?.accessToken,
        );
        await AsyncStorage.setItem(
          'refreshToken',
          response?.data?.data?.refreshToken,
        );
        setUserDetails(response?.data?.data);
        setUserToken(response.data?.data?.accessToken);
        await AsyncStorage.setItem(
          'userDetails',
          JSON.stringify(response.data?.data),
        );
      } else {
        // showToastRed(res);
      }
      return response?.data;
    } catch (err) {
      console.log(err.response.data.error.message);
      showToastRed(err.response.data.error.message);
      console.log(err);
      return err.response?.data;
    }
  };

  const createAccount = async (name, mobile_number, email, password,value) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/customer`, {
        name: name,
        mobile_number: mobile_number,
        email: email,
        password: password,
        country_id: value,
      });
      console.log('response', response?.data);
      if (response.data?.status === true) {
        showToastGreen(response?.data?.message);
        await AsyncStorage.setItem(
          'userDetails',
          JSON.stringify(response.data?.data),
        );
        await AsyncStorage.setItem(
          'userToken',
          response?.data?.data?.accessToken,
        );
        await AsyncStorage.setItem(
          'refreshToken',
          response?.data?.data?.refreshToken,
        );
        setUserToken(response?.data?.data?.accessToken);
        setUserDetails(response?.data?.data);
      }
      return response.data;
    } catch (err) {
      console.log(err.response.data.error.message);
      showToastRed(err.response.data.error.message);
      console.log(err);
      return err.response.data;
    }
  };

  const checkUser = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        // setUserDetails(details);
        setUserToken(token);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      } //
      const loc = await AsyncStorage.getItem('location');
      if(loc){
        const val = JSON.parse(loc);
        setLocationData(val)
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  const Logout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('location')
    setUserToken(null);
  };

  useEffect(() => {
    checkUser();
  }, [netConnected]);

  let contextValue = {
    a,
    LoginApi,
    createAccount,
    Logout,
    UserDetails,
    setUserDetails,
    isLoading,
    setIsLoading,
    profilePhoto,
    setProfilePhoto,
    profileData,
    setProfileData,
    locationData,
    setLocationData,
    UserToken,
    setUserToken,
    netConnected,setNetConnected,
    GetUserInfo: apiCall.getUserInfoRemote,
    SendOtp: apiCall.sendOtpApi,
    ResendOtp: apiCall.resendOtpApi,
    VerifyOtp: apiCall.verifyOtpApi,
    ResetPassword: apiCall.resetPasswordApi,
    GetProfile: apiCall.getProfileApi,
    GetBanners: apiCall.getBannersApi,
    GetTestimonials: apiCall.getTestimonialsApi,
    GetHospitals: apiCall.getHospitalsApi,
    GetServices: apiCall.getServicesApi,
    GetTherapists: apiCall.getTherapistsApi,
    CheckDate: apiCall.checkDateApi,
    BookAppointment: apiCall.bookAppointmentApi,
    GetHistory: apiCall.getHistoryApi,
    SearchHospitals:apiCall.searchHospitalsApi,
    CheckVersion:apiCall.checkVersionApi,
    GetCountries:apiCall.getCountriesApi,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
