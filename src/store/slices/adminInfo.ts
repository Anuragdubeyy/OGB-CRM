import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getAdminInfo } from "../api/adminInfo";

export interface AdminInfo{
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
    password:string;
}

export interface AdminState {
  allAdminInfoList: AdminInfo;
  totalAdminInfo:number;
  isAdminInfoLoading: boolean;
  adminInfoMessage: string;
  
}

const initialState: AdminState = {
  allAdminInfoList:  {
    id: '',
    name: '',
    email: '',
    mobile: '',
    isActive: '',
    isDelete: '',
    image: '',
    role: '',
    userType: '',
    created_at: '',
    updated_at: '',
    password: '',
  },
  totalAdminInfo: 0,
  isAdminInfoLoading: false,
  adminInfoMessage: '',
};


export const getAdminInfoAsync = createAsyncThunk(
    "adminInfo/getAdminInfo",
  async (admin_id:string) => {
    const res: any = await getAdminInfo(admin_id) ;
    // console.log(res.data)
    return res.data;
  }
  );


  const adminInfoSlice = createSlice({
    name: 'adminInfo',
    initialState,
    reducers: {
        clearAdminInfoMessage : state => {
            state.adminInfoMessage = '';
          },
    },

    extraReducers: builder => {
        builder
        .addCase(getAdminInfoAsync.pending, state => {
            state.isAdminInfoLoading = true;
        })

        .addCase(getAdminInfoAsync.fulfilled, (state, action) => {
            state.allAdminInfoList = action.payload.data;
            state.isAdminInfoLoading = false;
            state.allAdminInfoList = action.payload.data
            
        })

    },
  })

  export const  selectAllAdminInfoList = (state: RootState) =>
  state.adminInfo.allAdminInfoList;

export const { clearAdminInfoMessage} = adminInfoSlice.actions;
export default adminInfoSlice.reducer;