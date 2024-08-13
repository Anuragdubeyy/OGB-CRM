import axios from 'axios';
import { API_URL } from '../../../constant';

export function getAllDepositOrnaments() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(API_URL.GET_DEPOSIT_ORNAMENTS,{
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

  export function updateDepositOrnaments(formData: FormData) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(API_URL.UPDATE_DEPOSIT_ORNAMENTS, formData,{
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

  export function getDepositOrnamentImages(ornament_id: string) {
    return new Promise(async (resolve, reject) => {
      console.log(ornament_id)
      try {
        const response = await axios.get(API_URL.VIEW_DEPOSIT_ORNAMENTS(ornament_id),{
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



