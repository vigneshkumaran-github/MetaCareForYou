const {
  showToastGreen,
  showToastRed,
  getUserdetails,
} = require('../../HelperFunctions/Helper');

import {BASE_URL, axiosInstanceWithAuth} from '../Config';

import axios from 'axios';

export const getUserInfoRemote = async () => {
  console.log('CALLEEDDDDD');
  // try {
  //     const details = await getUserdetails()
  //     console.log(details, "ggggg")
  //     const response = await axios.post(`${BASE_URL}auth/user_details`,
  //         {
  //             userId: details.id
  //         }
  //     );
  //     return response?.data;
  // }
  // catch (err) {
  //     // console.log(err.response.data.error.message);
  //     // showToastRed(err?.data?.message)
  //     console.log(err,"ERR");
  //     return err.response?.data;
  // }
};

export const getBannersApi = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/base/banners`);
    return response?.data;
  } catch (err) {
    console.log(err, 'err############################################');
    // console.log(err.response.data.error.message);
    // showToastRed(err.response.data.error.message);
    return err.response.data;
  }
};

export const getTestimonialsApi = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/base/testimonials`);
    return response?.data;
  } catch (err) {
    console.log(err.response.data.error.message);
    showToastRed(err.response.data.error.message);
    console.log(err, 'err');
    return err.response.data;
  }
};

export const getHospitalsApi = async (lat, long, page, searchkey) => {
  // 11.03733800  77.03668500
  console.log(
    lat,
    long,
    page,
    '**********************************************',
  );
  try {
    const response = await axiosInstanceWithAuth.get(
      `/customer/hospitals?search=&latitude=${'11.03733800'}&longitude=${'77.03668500'}&page=${page}`,
    );
    return response?.data;
  } catch (err) {
    console.log(err.response.data.error.message);
    showToastRed(err.response.data.error.message);
    console.log(err, 'err');
    return err.response.data;
  }
};

export const searchHospitalsApi = async (lat, long, page, searchkey) => {
  // 11.03733800  77.03668500
  console.log(
    lat,
    long,
    page,
    '**********************************************',
  );
  try {
    const response = await axiosInstanceWithAuth.get(
      `/customer/hospitals?search=${searchkey}&latitude=${lat}&longitude=${long}&page=${page}`,
    );
    return response?.data;
  } catch (err) {
    console.log(err.response.data.error.message);
    showToastRed(err.response.data.error.message);
    console.log(err, 'err');
    return err.response.data;
  }
};

export const getServicesApi = async (id,page) => {
  try {
    const response = await axiosInstanceWithAuth.get(
      `/customer/hospitals/${id}/services?page=${page}`,
    );
    return response?.data;
  } catch (err) {
    console.log(err.response.data.error.message);
    showToastRed(err.response.data.error.message);
    console.log(err, 'err');
    return err.response.data;
  }
};

export const checkVersionApi = async (platform, version) => {
  console.log(platform,version)
  try {
    const response = await axiosInstanceWithAuth.post(`/auth/check-version`, {
      platform: platform,
      version:version,
    });
    return response?.data;
  } catch (err) {
    console.log(err.response.data.error.message);
    showToastRed(err.response.data.error.message);
    console.log(err, 'err');
    return err.response.data;
  }
};
