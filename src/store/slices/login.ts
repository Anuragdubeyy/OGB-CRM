import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Login } from '../../api/Login';
import { LoginInput } from '../../routes/schema/AuthSchema';
import { getGuestToken } from '../api/authAPI';

export interface LoginInfo{
  id:string;
  name:string;
  email:string;
  mobile:string;
  isActive:string;
  isDelete:string;
  image:string;
  role:string;
  userType:string;
  created_at:string;
  updated_at:string;
}

interface ILoginState {
  accessToken: string;
  loggedInUser: {
    adminId: string;
    email: string;
  };
  key: string;
  allLoginList: LoginInfo[];
  isLoginLoading: boolean;
  isLoginMessage: string;
  selectedLoginId: string;
}




const initialState: ILoginState = {
  accessToken: '',
  loggedInUser: {
    adminId: '',
    email: '',
  },
  key: '',
  allLoginList: [],
  isLoginLoading: false,
  isLoginMessage: '',
  selectedLoginId: '',
};

export const getGuestTokenAsync = createAsyncThunk(
  "auth/getguestToken",
  async () => {
    const res: any = await getGuestToken();
    return res.data;
  }
);

export const getAdminAsync = createAsyncThunk(
  "auth/login",
  async (email:LoginInput) => {
    const res: any = await Login(email);
    return res.data;
  }
);




const login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    getAccessToken: (state: ILoginState, action) => {
      state.accessToken = action.payload;
    },
    getLoggesInUser: (state: ILoginState, action) => {
      state.loggedInUser = action.payload;
    },

    
  },
  extraReducers: (builder) => {
    builder
    .addCase(getGuestTokenAsync.fulfilled, (state, action) => {
      state.key = action.payload.data.token;
      console.log(action.payload);
    })

    .addCase(getAdminAsync.pending, state => {
      state.isLoginLoading = true;
    })

    .addCase(getAdminAsync.fulfilled, (state, action) =>{
      state.allLoginList = [action.payload.data];
      state.isLoginLoading = false;
      state.allLoginList = action.payload.data
      console.log(action.payload.data)
      state.selectedLoginId = action.payload.data.id
    })
  }
});

export const selectAllLoginInfoList = (state: RootState) =>
state.authState.allLoginList

export const selectLoginId = (state: RootState) =>
state.authState.selectedLoginId

export const selectLoginInfoMessage = (state: RootState) =>
state.authState.isLoginMessage

export const { getAccessToken, getLoggesInUser } = login.actions;

export default login.reducer;
