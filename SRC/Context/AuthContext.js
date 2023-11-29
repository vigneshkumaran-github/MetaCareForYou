import { BASE_URL, axiosInstanceWithAuth } from '../Config/Config';
import React, { createContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext();

export const Authprovider = ({ children }) => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [UserToken, setUserToken] = useState(null);
    const a = "HELLO"

    let contextValue = {
        a,
    }
    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
}