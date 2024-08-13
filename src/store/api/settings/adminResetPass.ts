import axios from "axios";
import { API_URL } from "../../../constant";
import { CreateResetAdminPassword } from "../../../routes/schema/resetPassword";

export function resetAdminPassword({admin_id, password}:CreateResetAdminPassword) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(API_URL.POST_RESET_PASSWORD(admin_id,password),{
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