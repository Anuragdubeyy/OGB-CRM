import axios from "axios";
import { API_URL } from "../../../constant";

export function getAllNotification() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_ALL_NOTIFICATION, {
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