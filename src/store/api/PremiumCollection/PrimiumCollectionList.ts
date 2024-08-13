import axios from "axios";
import { API_URL } from "../../../constant";
import { UpdatePremiumCollectionInput } from "../../../routes/schema/premiumCollection";

export function getAllPremiumCollection() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_PREMIUM_COLLECTION,{
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

export function updatePremiumCollection({
  ornament_id,
  stock_count,
}: UpdatePremiumCollectionInput) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.UPDATE_STOCK_COUNT(ornament_id, stock_count),{
        headers: {
          Authorization: localStorage.getItem('ogbToken'),
          admin_id: localStorage.getItem('userId'),
  
        },
      }
      );

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

export function uploadPremiumImage(formData:FormData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(API_URL.UPLOAD_PREMIUM_IMAGE, formData,{
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

export function addPremiumOrnaments(formData:FormData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(API_URL.ADD_PREMIUM_ORNAMENTS, formData,{
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

export function getPremiumCollectionImages(ornament_id: string) {
  return new Promise(async (resolve, reject) => {
    console.log(ornament_id)
    try {
      const response = await axios.get(API_URL.VIEW_PREMIUM_IMAGE(ornament_id),{
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

export function deletePremiumCollectionImages(image_id: string) {
  return new Promise(async (resolve, reject) => {
    console.log(image_id)
    try {
      const response = await axios.get(API_URL.DELETE_PREMIUM_IMAGE(image_id),{
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

export function getPremiumCollectionCategory() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_CATEGORIES_LIST,{
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


