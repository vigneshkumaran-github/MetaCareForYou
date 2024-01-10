import { getBannersApi, getTestimonialsApi, getUserInfoRemote } from './HomeApi';
import { resendOtpApi, resetPasswordApi, sendOtpApi, verifyOtpApi } from './AuthApi';

import { getProfileApi } from './ProfileApi';

export default {
    getUserInfoRemote,
    sendOtpApi,
    resendOtpApi,
    verifyOtpApi,
    resetPasswordApi,  
    getProfileApi,
    getBannersApi,
    getTestimonialsApi,
}