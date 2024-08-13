import axios from "axios";
import { API_URL } from "../../../constant";

export function getCustomerOTCBarter(user_id: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_OTC_BARTER(user_id),{
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

export function getCustomerOTCBarterAdd(userid: string, ornament_id:string) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_OTC_BARTER_ORNAMENT_ADD(userid, ornament_id),{
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


export function getCustomerOTCBarterRemove(userid: string, ornament_id:string) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_OTC_BARTER_ORNAMENT_REMOVE(userid, ornament_id),{
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

