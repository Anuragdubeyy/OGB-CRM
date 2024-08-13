import axios from 'axios';
import { API_URL } from '../../constant';

export async function getAdminInfo(admin_id: string) {
  try {
    
    const response = await axios.get(API_URL.GET_ADMIN_INFO(admin_id), {
      headers: {
        Authorization: localStorage.getItem('ogbToken'),
        admin_id: localStorage.getItem('userId'),

      },
    });
    // console.log( headers)

    return { data: response.data };
  } catch (error:any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
}
