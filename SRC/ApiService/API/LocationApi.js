import {AuthContext} from '../../Context/AuthContext';
import axios from 'axios';
import {useContext} from 'react';

export const getUserLocationInfo = async (locationData) => {
  try {
    const value = await getLocations();
    console.log(locationData,'jsjkxjjj');

    if (locationData?.latitude) {
      const url =
        'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' +
        '9.3560742' +
        '&longitude=' +
        '78.8621505';
      const response = await axios.get(url);
      console.log(response)
      return response.data;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getLocations = async () => {
  try {
    // const data = await AsyncStorage.getItem('location_details');
    // dev numbers
    // return {userId: '1539', mobile: '6384320081'};
    return JSON.parse(data);
  } catch {
    return null;
  }
};
