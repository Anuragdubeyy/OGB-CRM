import axios from 'axios';
import { API_URL } from '../../../constant';

export function getDashboardView() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(API_URL.GET_OVERVIEW,{
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

  export function getAllAlertDetails() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(API_URL.GET_ALL_ALERT,{
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

  export function getDashboardGoldChart() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(API_URL.GET_OVERVIEW_GOLD_CHART,{
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

  export function getDashboardRecentRequest() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(API_URL.GET_OVERVIEW_RECENT_REQUEST,{
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

  export function getDashboardBookingSlot() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(API_URL.GET_OVERVIEW_BOOKING_SLOT,{
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
