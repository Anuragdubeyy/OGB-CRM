import axios from 'axios';
import { API_URL } from '../../../constant';

export function getAllBarterAvailable() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(API_URL.GET_BARTER_AVAILABLE,{
          headers: {
            Authorization: localStorage.getItem('ogbToken'),
            Admin_id: localStorage.getItem('userId'),
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



