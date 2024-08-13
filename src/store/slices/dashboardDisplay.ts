import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getDisplayRequestList } from "../api/Dashboard/RequestAPI";

export interface DashboardDisplay{
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

export interface DashboardDisplayState {
    allDashboardDisplayList: DashboardDisplay[];
    totalDashboardDisplay: number;
    isDashboardDisplayLoading: boolean;
    dashboardDisplayMessage: string;
  }
  
  const initialState: DashboardDisplayState = {
    allDashboardDisplayList: [],
    totalDashboardDisplay: 0,
    isDashboardDisplayLoading: false,
    dashboardDisplayMessage: "",
  };


  
  export const getDashboardDisplayListAsync = createAsyncThunk(
    "dashboardDisplay/getAllDashboardDisplay",
  
    async () => {
      const res: any = await getDisplayRequestList();
      return res.data;
    }
  );
  
  
  const dashboardDisplaySlice = createSlice({
    name: "dashboardDisplay",
    initialState,
    reducers: {
      clearDashboardDisplayMessage: (state) => {
        state.dashboardDisplayMessage = "";
      },
    },

  
    extraReducers: (builder) => {
      builder
        .addCase(getDashboardDisplayListAsync.pending, (state) => {
          state.isDashboardDisplayLoading = true;
        })
        .addCase(getDashboardDisplayListAsync.fulfilled, (state, action) => {
          state.allDashboardDisplayList = action.payload.data;
          state.isDashboardDisplayLoading = false;
        })
        .addCase(getDashboardDisplayListAsync.rejected, (state) => {
          state.isDashboardDisplayLoading = false;
        })
        
    },
  });
  
  export const selectAllDashboardDisplayList = (state: RootState) =>
    state.dashboardDisplay.allDashboardDisplayList;
  export const selectDashboardDisplayMessage = (state: RootState) =>
    state.dashboardDisplay.dashboardDisplayMessage;
  export const selectDashboardDisplayLoading = (state: RootState) =>
    state.dashboardDisplay.isDashboardDisplayLoading;
  export const selectTotalDashboardDisplay = (state: RootState) =>
    state.dashboardDisplay.totalDashboardDisplay;

  export const { clearDashboardDisplayMessage } = dashboardDisplaySlice.actions;
  export default dashboardDisplaySlice.reducer;
