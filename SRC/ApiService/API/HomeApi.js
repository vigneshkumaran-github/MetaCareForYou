const {
  showToastGreen,
  showToastRed,
  getUserdetails,
} = require('../../HelperFunctions/Helper');

import {BASE_URL} from '../Config';
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
    const response = await axiosInstanceWithAuth.get(`/customer/banners`);
    return response?.data;
  } catch (err) {
    console.log(err.response.data.error.message);
    showToastRed(err.response.data.error.message);
    console.log(err, 'err');
    return err.response.data;
  }
};

export const getTestimonialsApi = async () => {
    try {
      const response = await axiosInstanceWithAuth.get(`/customer/testimonials`);
      return response?.data;
    } catch (err) {
      console.log(err.response.data.error.message);
      showToastRed(err.response.data.error.message);
      console.log(err, 'err');
      return err.response.data;
    }
  };

