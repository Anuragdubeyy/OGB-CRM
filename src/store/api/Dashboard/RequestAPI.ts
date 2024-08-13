import axios from "axios";
import { API_URL } from "../../../constant";

export function getWithdrawRequestList() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(API_URL.GET_WITHDRAW_REQUEST_LIST,{
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
    // BARTER REQUEST
  export function getBarterRequestList() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(API_URL.GET_BARTER_REQUEST_LIST,{
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

  export function getDisplayRequestList() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(API_URL.GET_DISPLAY_REQUEST_LIST,{
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

  export function getImmediateSellRequestList() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(API_URL.GET_IMMEDIATE_SELL_REQUEST_LIST,{
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