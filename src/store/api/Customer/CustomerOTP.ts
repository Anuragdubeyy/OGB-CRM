import axios from "axios";
import { API_URL } from "../../../constant";

export function getCustomerOtp(mobilenumber: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_CUSTOEMR_OTP(mobilenumber),{
        headers: {
          Authorization: localStorage.getItem('ogbToken'),
          admin_id: localStorage.getItem('userId'),
  
        },
      });

      resolve({ data: response.data });
    } catch (error: any) {
      if (error.response) {
        reject(error.response.data);
      } else {
        reject(error);
      }
    }
  });
}

export const getCustomerVerifyOtp = async (
  mobilenumber: string,
  otp: string
) => {
  try {
    const response = await axios.get(API_URL.GET_VERIFY_OTP(mobilenumber, otp),{
      headers: {
        Authorization: localStorage.getItem('ogbToken'),
        admin_id: localStorage.getItem('userId'),

      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error("Failed to verify OTP");
  }
};

