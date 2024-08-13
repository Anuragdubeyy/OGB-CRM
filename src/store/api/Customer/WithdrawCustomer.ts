import axios from "axios";
import { API_URL } from "../../../constant";

export function getCustomerWithdraw(user_id: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_WITHDRAW_REQUEST(user_id),{
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

export function getCustomerWithdrawRequest(user_id: string, ornament_id:string) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_CUSTOMER_WITHDRAW_REQUEST(user_id, ornament_id),{
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
