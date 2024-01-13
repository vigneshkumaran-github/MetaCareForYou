import { axiosInstanceWithAuth } from "../Config";
import { showToastRed } from "../../HelperFunctions/Helper";

export const getHistoryApi = async (page) => {
    try {
      const response = await axiosInstanceWithAuth.get(`/customer/appointments?page=${page}`);
      return response?.data;
    } catch (err) {
      console.log(err.response.data.error.message);
      showToastRed(err.response.data.error.message);
      console.log(err, 'err');
      return err.response.data;
    }
  };
