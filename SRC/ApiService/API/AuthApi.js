import {BASE_URL, axiosInstanceWithAuth} from '../Config';

import axios from 'axios';
import {showToastRed} from '../../HelperFunctions/Helper';

export const sendOtpApi = async (email) => {
  console.log('hgggggg');
  try {
    const response = await axios.post(`${BASE_URL}/auth/send-otp`, {
      email: email,
    });
    return response?.data;
  } catch (err) {
    console.log(err.response.data.error.message);
    showToastRed(err.response.data.error.message);
    console.log(err);
    return err.response.data;
  }
};

export const resendOtpApi = async email => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/resend-otp`, {
      email: email,
    });
    return response?.data;
  } catch (err) {
    console.log(err.response.data.error.message);
    showToastRed(err.response.data.error.message);
    console.log(err);
    return err.response.data;
  }
};

export const verifyOtpApi = async (email,otp) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/verify-otp`, {
      email: email,
      otp: otp,
    });
    return response?.data;
  } catch (err) {
    console.log(err.response.data.error.message);
    showToastRed(err.response.data.error.message);
    console.log(err);
    return err.response.data;
  }
};

export const resetPasswordApi = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/reset-password`, {
      email: email,
      password: password,
    });
    return response?.data;
  } catch (err) {
    console.log(err.response.data.error.message);
    showToastRed(err.response.data.error.message);
    console.log(err);
    return err.response.data;
  }
};
