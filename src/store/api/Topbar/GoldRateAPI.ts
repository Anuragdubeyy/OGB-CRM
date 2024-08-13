import axios from "axios";
import { API_URL } from "../../../constant";

export function getTodayGoldRange() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_TODAY_GOLD_RATE, {
        headers: {
          Authorization: localStorage.getItem("ogbToken"),
          admin_id: localStorage.getItem("userId"),
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

export function updateTodayGoldRange(price: string) {
  return new Promise(async (resolve, reject) => {
    //   console.log(ornament_id)
    try {
      const response = await axios.get(API_URL.UPDATE_TODAY_GOLD_RATE(price), {
        headers: {
          Authorization: localStorage.getItem("ogbToken"),
          admin_id: localStorage.getItem("userId"),
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
