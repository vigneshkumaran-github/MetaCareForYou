import React, { createContext, useContext, useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Authprovider } from './AuthContext';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    let a = "HELLO";

    let contextValue = {
        a,
    }
    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    )
}














// import { BASE_URL, axiosInstanceWithAuth } from '../Config/Config';
// import React, { createContext, useEffect, useState } from 'react';
// import { showToastGreen, showToastRed } from '../HelperFunctions/Helper';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';


// export const AuthContext = createContext();

// export const Authprovider = ({ children }) => {
//     const navigation = useNavigation();
//     const [isLoading, setIsLoading] = useState(false);
//     const [UserToken, setUserToken] = useState(null);
//     const [UserType, setUserType] = useState()
//     let a = "HELLO"

//     const LoginApi = async (email, password, user_type) => {
//         try {
//             console.log("REQUEST>>", email, password, user_type)
//             const response = await axios.post(
//                 `${BASE_URL}/auth/student-login`,
//                 {
//                     email_id: email,
//                     password: password,
//                     user_type: "Patient",
//                 }
//             );
//             if (response.data?.status === true) {
//                 showToastGreen(response?.data?.message)
//                 await AsyncStorage.setItem(
//                     'userToken',
//                     response.data?.data?.accessToken,
//                 );
//                 await AsyncStorage.setItem(
//                     'refreshToken',
//                     response.data?.data?.refreshToken,
//                 );
//                 // await AsyncStorage.setItem('userType', response.data?.data?.user_type);
//                 // setUserToken(response.data?.data?.accessToken)
//                 // setUserType(response.data?.data?.user_type)
//                 // OneSignal.sendTag('user_id', response.data?.data?.tokens?.user_id.toString(),);
//                 // OneSignal.sendTag('user_type', response.data?.data?.tokens?.user_type.toString(),);

//                 // OneSignal.getDeviceState().then((devicestate) => {
//                 //     console.log("Device State", devicestate.userId)
//                 //     UpdateSubId(devicestate.userId);
//                 // })

//                 // OneSignal.User.pushSubscription.optIn()
//                 // OneSignal.User.addTag("user_type", response.data?.data?.user_type.toString());
//                 // OneSignal.User.pushSubscription.addEventListener('change', (subscription) => {
//                 //     console.log('OneSignal: subscription changed:', subscription);
//                 //     UpdateSubId(subscription?.current?.id);
//                 // });
//             }
//             return response?.data;
//         }
//         catch (err) {
//             console.log(err.response.data.error.message);
//             showToastRed(err.response.data.error.message,)
//             console.log(err);
//             return err.response?.data;
//         }
//     };

//     let contextValue = {
//         a,
//         LoginApi,
//     }
//     return(
//         <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
//     );
// }