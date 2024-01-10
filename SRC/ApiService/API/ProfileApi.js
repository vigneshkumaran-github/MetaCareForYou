import {BASE_URL, axiosInstanceWithAuth} from '../Config';

import axios from 'axios';
import {showToastRed} from '../../HelperFunctions/Helper';

export const getProfileApi = async () => {
  try {
    const response = await axiosInstanceWithAuth.get(`/customer`);
    return response?.data;
  } catch (err) {
    // console.log(err.response.data.error.message);
    // showToastRed(err.response.data.error.message);
    console.log(err, 'err');
    return err.response.data;
  }
};
