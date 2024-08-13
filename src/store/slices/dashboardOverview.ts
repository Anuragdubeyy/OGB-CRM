import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDashboardBookingSlot, getDashboardGoldChart, getDashboardRecentRequest, getDashboardView } from "../api/Dashboard/Overview";
import { RootState } from "..";

export interface DashboardOverview{
    total_user: string;
    Total_deposited_ornament: string;
    total_barter_ornament:string;
    total_barter_user:string;
    total_withdraw_ornament:string;
    total_gold_weight: string;
    total_ornament_value: string;
}

export interface BookingSlot{
  timeSlot:string;
  value:number;

}
export interface DashboardOverviewRequest{
  request_type:string;
  status:string;
  date:string;
  time:string;
  name:string;
  phone:string;
}

export interface DashboardOverviewState {
    allDashboardOverviewList: DashboardOverview[];
    totalDashboardOverview: number;
    isDashboardOverviewLoading: boolean;
    dashboardOverviewMessage: string;
    dashboardChart: []
    dashboardRequestList: DashboardOverviewRequest[];
    allBookingSlotList: BookingSlot[];
  }
  
  const initialState: DashboardOverviewState = {
    allDashboardOverviewList: [],
    totalDashboardOverview: 0,
    isDashboardOverviewLoading: false,
    dashboardOverviewMessage: "",
    dashboardChart: [],
    dashboardRequestList: [],
    allBookingSlotList:[],
  };


  

  
  export const getDashboardOverviewListAsync = createAsyncThunk(
    "DashboardOverview/getAllDashboardOverview",
  
    async () => {
      const res: any = await getDashboardView();
      return res.data;
    }
  );

  export const getDashboardOverviewChartListAsync = createAsyncThunk(
    "dashboardOverviewChart/getAllDashboardOverviewChart",
  
    async () => {
      const res: any = await getDashboardGoldChart();
      return res.data;
    }
  );

  export const getDashboardOverviewRequestListAsync = createAsyncThunk(
    "dashboardOverviewRequest/getAllDashboardOverviewRequest",
  
    async () => {
      const res: any = await getDashboardRecentRequest();
      return res.data;
      // console.log(data)
    }
  );

  export const getDashboardOverviewRecentSlotListAsync = createAsyncThunk(
    "dashboardOverviewRecentSlot/getAllDashboardOverviewRecentSlot",
  
    async () => {
      const res: any = await getDashboardBookingSlot();
      return res.data;
    }
  );



  
  const dashboardOverviewSlice = createSlice({
    name: "dashboardOverview",
    initialState,
    reducers: {
      clearDashboardOverviewMessage: (state) => {
        state.dashboardOverviewMessage = "";
      },
    },

  
    extraReducers: (builder) => {
      builder
        .addCase(getDashboardOverviewListAsync.pending, (state) => {
          state.isDashboardOverviewLoading = true;
        })
        .addCase(getDashboardOverviewListAsync.fulfilled, (state, action) => {
          state.allDashboardOverviewList = action.payload.data;
          state.isDashboardOverviewLoading = false;
        })
        .addCase(getDashboardOverviewListAsync.rejected, (state) => {
          state.isDashboardOverviewLoading = false;
        })
            // dashboard chart
        .addCase(getDashboardOverviewChartListAsync.pending, (state) => {
          state.isDashboardOverviewLoading = true;
        })
        .addCase(getDashboardOverviewChartListAsync.fulfilled, (state, action) => {
          state.dashboardRequestList = action.payload.data;
          state.isDashboardOverviewLoading = false;
        })
        .addCase(getDashboardOverviewChartListAsync.rejected, (state) => {
          state.isDashboardOverviewLoading = false;
        })

        // recent request
        .addCase(getDashboardOverviewRequestListAsync.pending, (state) => {
          state.isDashboardOverviewLoading = true;
        })
        .addCase(getDashboardOverviewRequestListAsync.fulfilled, (state, action) => {
          state.dashboardRequestList = action.payload.data;
          state.isDashboardOverviewLoading = false;
        })
        .addCase(getDashboardOverviewRequestListAsync.rejected, (state) => {
          state.isDashboardOverviewLoading = false;
        })

        //  booking slot
        .addCase(getDashboardOverviewRecentSlotListAsync.pending, (state) => {
          state.isDashboardOverviewLoading = true;
        })
        .addCase(getDashboardOverviewRecentSlotListAsync.fulfilled, (state, action) => {
          state.allBookingSlotList = action.payload.data;
          console.log(action.payload.data)
          state.isDashboardOverviewLoading = false;
        })
        .addCase(getDashboardOverviewRecentSlotListAsync.rejected, (state) => {
          state.isDashboardOverviewLoading = false;
        });

  
      //   .addCase(deleteCustomerAsync.fulfilled, (state, action) => {
      //     state.allCustomerList = state.allCustomerList.filter(
      //       customer_id => customer_id !== action.payload.data,
      //     );
  
      //     state.customerMessage = action.payload.message;
      //     state.isCustomerLoading = false;
      //   })
  
      //   .addCase(deleteCustomerAsync.pending, state => {
      //     state.isCustomerLoading = true;
      //   })
      //   .addCase(deleteCustomerAsync.rejected, (state, action) => {
      //     state.isCustomerLoading = false;
      //     state.customerMessage = action.error.message
      //       ? action.error.message
      //       : 'Something went wrong';
      //   })
    },
  });
  
  export const selectAllDashboardOverviewList = (state: RootState) =>
    state.dashboardOverview.allDashboardOverviewList;
  export const selectDashboardOverviewMessage = (state: RootState) =>
    state.dashboardOverview.dashboardOverviewMessage;
  export const selectDashboardOverviewLoading = (state: RootState) =>
    state.dashboardOverview.isDashboardOverviewLoading;
  export const selectTotalDashboardOverview = (state: RootState) =>
    state.dashboardOverview.totalDashboardOverview;
    export const selectDashboardOverviewChartData = (state: RootState) =>
    state.dashboardOverview.dashboardChart;
    export const selectDashboardOverviewRecentRequest = (state: RootState) =>
    state.dashboardOverview.dashboardRequestList;
    export const selectDashboardOverviewBookingSlot = (state: RootState) =>
    state.dashboardOverview.allBookingSlotList;
  
  export const { clearDashboardOverviewMessage } = dashboardOverviewSlice.actions;
  export default dashboardOverviewSlice.reducer;
  