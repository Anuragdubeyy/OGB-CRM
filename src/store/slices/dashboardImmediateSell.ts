import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getImmediateSellRequestList } from "../api/Dashboard/RequestAPI";

export interface DashboardImmediateSell{
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

export interface DashboardImmediateSellState {
    allDashboardImmediateSellList: DashboardImmediateSell[];
    totalDashboardImmediateSell: number;
    isDashboardImmediateSellLoading: boolean;
    dashboardImmediateSellMessage: string;
  }
  
  const initialState: DashboardImmediateSellState = {
    allDashboardImmediateSellList: [],
    totalDashboardImmediateSell: 0,
    isDashboardImmediateSellLoading: false,
    dashboardImmediateSellMessage: "",
  };


  
  export const getDashboardImmediateSellListAsync = createAsyncThunk(
    "dashboardImmediateSell/getAllDashboardImmediateSell",
  
    async () => {
      const res: any = await getImmediateSellRequestList();
      return res.data;
    }
  );
  
  
  const dashboardImmediateSellSlice = createSlice({
    name: "dashboardImmediateSell",
    initialState,
    reducers: {
      clearDashboardImmediateSellMessage: (state) => {
        state.dashboardImmediateSellMessage = "";
      },
    },

  
    extraReducers: (builder) => {
      builder
        .addCase(getDashboardImmediateSellListAsync.pending, (state) => {
          state.isDashboardImmediateSellLoading = true;
        })
        .addCase(getDashboardImmediateSellListAsync.fulfilled, (state, action) => {
          state.allDashboardImmediateSellList = action.payload.data;
          state.isDashboardImmediateSellLoading = false;
        })
        .addCase(getDashboardImmediateSellListAsync.rejected, (state) => {
          state.isDashboardImmediateSellLoading = false;
        })
        
    },
  });
  
  export const selectAllDashboardImmediateSellList = (state: RootState) =>
    state.dashboardImmediateSell.allDashboardImmediateSellList;
  export const selectDashboardImmediateSellMessage = (state: RootState) =>
    state.dashboardImmediateSell.dashboardImmediateSellMessage;
  export const selectDashboardImmediateSellLoading = (state: RootState) =>
    state.dashboardImmediateSell.isDashboardImmediateSellLoading;
  export const selectTotalDashboardImmediateSell = (state: RootState) =>
    state.dashboardImmediateSell.totalDashboardImmediateSell;

  

  
  export const { clearDashboardImmediateSellMessage } = dashboardImmediateSellSlice.actions;
  export default dashboardImmediateSellSlice.reducer;
  