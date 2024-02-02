import { bookAppointmentApi, checkDateApi, getTherapistsApi } from './DoctorApi';
import { getBannersApi,checkVersionApi, getHospitalsApi, getServicesApi, getTestimonialsApi, getUserInfoRemote ,searchHospitalsApi} from './HomeApi';
import { resendOtpApi, resetPasswordApi, sendOtpApi, verifyOtpApi } from './AuthApi';

import { getHistoryApi } from './HistoryApi';
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
    getHospitalsApi,
    getServicesApi,
    getTherapistsApi,
    checkDateApi,
    bookAppointmentApi,
    getHistoryApi,
    searchHospitalsApi,
    checkVersionApi
}