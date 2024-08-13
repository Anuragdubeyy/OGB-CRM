import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getWithdrawRequestList } from "../api/Dashboard/RequestAPI";

export interface DashboardWithdraw{
    id: string;
    request_type: string;
    user_id:string;
    status:string;
    ornament_id:string;
    remark: string;
    date: string;
    time: string;
    address:string;
    user:User;
}

export interface User{
    _id:string;
    created_at:string;
    updated_at:string;
    mobilenumber:string;
    emialid:string;
    name:string;
    isPrivileged:string;
    isBarter:string;
    isDeleted:string;
    isActive:string;
    profileImage:string;
    isSiezed:string;
    
}

export interface DashboardWithdrawState {
    allDashboardWithdrawList: DashboardWithdraw[];
    totalDashboardWithdraw: number;
    isDashboardWithdrawLoading: boolean;
    dashboardWithdrawMessage: string;
  }
  
  const initialState: DashboardWithdrawState = {
    allDashboardWithdrawList: [],
    totalDashboardWithdraw: 0,
    isDashboardWithdrawLoading: false,
    dashboardWithdrawMessage: "",
  };


  
  export const getDashboardWithdrawListAsync = createAsyncThunk(
    "dashboardWithdraw/getAllDashboardWithdraw",
  
    async () => {
      const res: any = await getWithdrawRequestList();
      return res.data;
    }
  );
  
  
  const dashboardWithdrawSlice = createSlice({
    name: "dashboardWithdraw",
    initialState,
    reducers: {
      clearDashboardWithdrawMessage: (state) => {
        state.dashboardWithdrawMessage = "";
      },
    },

  
    extraReducers: (builder) => {
      builder
        .addCase(getDashboardWithdrawListAsync.pending, (state) => {
          state.isDashboardWithdrawLoading = true;
        })
        .addCase(getDashboardWithdrawListAsync.fulfilled, (state, action) => {
          state.allDashboardWithdrawList = action.payload.data;
          state.isDashboardWithdrawLoading = false;
        })
        .addCase(getDashboardWithdrawListAsync.rejected, (state) => {
          state.isDashboardWithdrawLoading = false;
        })
        
    },
  });
  
  export const selectAllDashboardWithdrawList = (state: RootState) =>
    state.dashboardWithdraw.allDashboardWithdrawList;
  export const selectDashboardWithdrawMessage = (state: RootState) =>
    state.dashboardWithdraw.dashboardWithdrawMessage;
  export const selectDashboardWithdrawLoading = (state: RootState) =>
    state.dashboardWithdraw.isDashboardWithdrawLoading;
  export const selectTotalDashboardWithdraw = (state: RootState) =>
    state.dashboardWithdraw.totalDashboardWithdraw;

  

  
  export const { clearDashboardWithdrawMessage } = dashboardWithdrawSlice.actions;
  export default dashboardWithdrawSlice.reducer;
  