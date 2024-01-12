import {axiosInstanceWithAuth} from '../Config';
import {showToastRed} from '../../HelperFunctions/Helper';

export const getTherapistsApi = async id => {
  console.log(id);
  try {
    const response = await axiosInstanceWithAuth.get(
      `/customer/hospitals/services/${id}?page=1`,
    );
    return response?.data;
  } catch (err) {
    console.log(err.response.data.error.message);
    showToastRed(err.response.data.error.message);
    console.log(err, 'err');
    return err.response.data;
  }
};

export const checkDateApi = async (id,date) => {
  console.log(id);
  try {
    const response = await axiosInstanceWithAuth.post(
      `/customer/check-availability`,
      {
        therapist_id:id,
        date: date,
      },
    );
    return response?.data;
  } catch (err) {
    console.log(err.response.data.error.message);
    showToastRed(err.response.data.error.message);
    console.log(err, 'err');
    return err.response.data;
  }
};

export const bookAppointmentApi = async (id,date) => {
    console.log(id,date);
    try {
      const response = await axiosInstanceWithAuth.post(
        `/customer/appointments`,
        {
          therapist_id:id,
          appointment_date: date.toString(),
        },
      );
      return response?.data;
    } catch (err) {
      console.log(err.response.data.error.message);
      showToastRed(err.response.data.error.message);
      console.log(err, 'err');
      return err.response.data;
    }
  };
