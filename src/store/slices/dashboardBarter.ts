import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getBarterRequestList } from "../api/Dashboard/RequestAPI";

export interface DashboardBarter{
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

export interface DashboardBarterState {
    allDashboardBarterList: DashboardBarter[];
    totalDashboardBarter: number;
    isDashboardBarterLoading: boolean;
    dashboardBarterMessage: string;
  }
  
  const initialState: DashboardBarterState = {
    allDashboardBarterList: [],
    totalDashboardBarter: 0,
    isDashboardBarterLoading: false,
    dashboardBarterMessage: "",
  };

  
  export const getDashboardBarterListAsync = createAsyncThunk(
    "dashboardBarter/getAllDashboardBarter",
  
    async () => {
      const res: any = await getBarterRequestList();
      return res.data;
    }
  );

  
  const dashboardBarterSlice = createSlice({
    name: "dashboardBarter",
    initialState,
    reducers: {
      clearDashboardBarterMessage: (state) => {
        state.dashboardBarterMessage = "";
      },
    },

  
    extraReducers: (builder) => {
      builder
        // barter request
        .addCase(getDashboardBarterListAsync.pending, (state) => {
          state.isDashboardBarterLoading = true;
        })
        .addCase(getDashboardBarterListAsync.fulfilled, (state, action) => {
          state.allDashboardBarterList = action.payload.data;
          state.isDashboardBarterLoading = false;
        })
        .addCase(getDashboardBarterListAsync.rejected, (state) => {
          state.isDashboardBarterLoading = false;
        })
    },
  });
  
// barter
    export const selectAllDashboardBarterList = (state: RootState) =>
    state.dashboardBarter.allDashboardBarterList;
  export const selectDashboardBarterMessage = (state: RootState) =>
    state.dashboardBarter.dashboardBarterMessage;
  export const selectDashboardBarterLoading = (state: RootState) =>
    state.dashboardBarter.isDashboardBarterLoading;
  export const selectTotalDashboardBarter = (state: RootState) =>
    state.dashboardBarter.totalDashboardBarter;

  

  
  export const { clearDashboardBarterMessage } = dashboardBarterSlice.actions;
  export default dashboardBarterSlice.reducer;
  