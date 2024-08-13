import axios from 'axios';
import { API_URL } from '../constant';
import { getAccessToken, getLoggesInUser } from '../store/slices/login';
// import { setApiMessage } from '../store/slices/apiMessage';
import { setLoader } from '../store/slices/loader';
import { toast } from 'react-toastify';

interface ILoginProps {
  email: string;
  password: string;
  
}

export const Login =
  ({ email, password }: ILoginProps) =>
  async (dispatch: any) => {
    try {
      dispatch(setLoader(true));
      const response = await axios.get(API_URL.GET_ADMING_LOGIN, {
        params: {
          email,
          password,
        },
      });

      dispatch(setLoader(false));
      dispatch(getAccessToken(response.data.data.token));
      dispatch(getLoggesInUser(response.data.data));
    //   localStorage.setItem('loanLogged', response.data.data[1]._id);
      
      // console.log(response.data.data.token);
      // console.log(response.data.data.admin.id);
      

      localStorage.setItem('ogbToken', response.data.data.token);
      localStorage.setItem('userId', response.data.data.admin.id)

      toast.success('Login Successfully', {
        position: 'top-right',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error: any) {
      dispatch(setLoader(false));
      console.log(error.message);
      
      toast.error(error.response.data.message || error.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
    }
  };
