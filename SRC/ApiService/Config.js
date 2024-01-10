import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import  jwt_decode  from 'jwt-decode';
import moment from 'moment';

// @ts-ignore






export const BASE_URL = 'https://25c6-2401-4900-4839-e9cc-79de-d838-f829-a736.ngrok-free.app/api/v2';
// export const BASE_URL='https://api.metacare4u.online/api/v1/auth/'
export const  IMAGE_BASE_URL = 'https://api.metacare4u.online/images/';


// export default {
//     baseUrl:'https://api.metacare4u.online/',
//     APIURL : 'https://api.metacare4u.online/api/v1/auth/',
//     IMAGE_BASE_URL : 'https://api.metacare4u.online/images/',
//  }

export const axiosInstanceWithAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
    "Authorization": `Bearer ${AsyncStorage.getItem('userToken')}`,
  },
});

axiosInstanceWithAuth.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('userToken');
  console.log(token)
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  if (token) {
    config.headers.Authorization = `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDQ4OTAxOTIsImV4cCI6MTcwNTc1NDE5MiwiYXVkIjoiY2NlNWFmOWZiNzkzNDMzZDAxNjhlODY4ODE1YzU1YTNkYjgxYzQyOWU0M2IzODYzMzIxYjdjNmU0MGIzOGU0Njk0ZWI0ODI5ODdiZDc0YmE2MGJkZWUiLCJpc3MiOiJtZXRhY2FyZTR1LmxpZmUiLCJzdWIiOiJjdXN0b21lciJ9.yH5ct-7uQw25p4GGikZZGDwxUWfpHu0f6wg82sbIOJs'}`;
    console.log('token set')
  }
  console.log(token,'usertoken')
  const decoded = jwt_decode(token);
  const currentTime = moment().unix();
  if (decoded.exp > currentTime) {
    console.log('token not expired');
    return config;
  }
  if (decoded.exp < currentTime) {
    console.log(token);
    console.log(refreshToken);
    const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
      refresh_token: refreshToken,
    });
    console.log(response);
    console.log('token expired');
    AsyncStorage.setItem('userToken', response.data.data.accessToken);
    AsyncStorage.setItem('refreshToken', response.data.data.refreshToken);
    config.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
  }
  return config;
});
