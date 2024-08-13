import axios from 'axios';
import { API_URL } from '../../../constant';

export function getAllPrivilegeUser(user_id:string) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(API_URL.GET_USER_PRIVILEGE(user_id),{
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



