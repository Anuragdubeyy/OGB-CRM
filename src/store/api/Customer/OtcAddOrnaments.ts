import axios from "axios";
import { API_URL } from "../../../constant";

export function addOtcOrnaments(formData:FormData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(API_URL.POST_OTC_ORNAMENTS, formData,{
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
