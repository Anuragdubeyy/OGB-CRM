import axios from 'axios';
import { API_URL } from '../../constant';
import { generateRandomString } from '../../lib/utils';

export interface ILoginProps {
  email: string;
  password: string;
}

export function getGuestToken() {
  return new Promise(async (resolve, reject) => {
    try {
      const randomString = generateRandomString( )
      const response = await axios.post(API_URL.GET_GUEST_TOKEN,  {key: randomString});
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

// export function getLoginInfo() {
//   return new Promise(async (resolve, reject) => {
//     const Authorization = localStorage.getItem('loanToken') || '';
//     try {
//       const response = await axios.get(API_URL.GET_LOGGGEDIN_INFO, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization,
//         },
//       });

//       resolve({ data: response.data });
//     } catch (error: any) {
//       if (error.response) {
//         reject(error.response.data);
//       } else {
//         reject(error);
//       }
//     }
//   });
// }



export function login({ email, password }: ILoginProps) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_ADMING_LOGIN, {
        params: {
          email,
          password,
        },
      });
      localStorage.setItem('ogbLogged', response.data.data.id);
      localStorage.setItem('ogbToken', response.data.data.token);
      localStorage.setItem('userId', response.data.data.admin.id)

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

