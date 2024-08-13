import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  getCustomerOTCWithdraw,
  getCustomerOTCWithdrawRequest,
} from "../api/Customer/OtcWithdraw";

export interface CustomerOtcWithdraw {
  user_id: string;
  ornament_id: string;
  ornament_name: string;
  ornament_description: string;
  category: string;
  width: string;
  height: string;
  carat: string;
  gold_weight: string;
  total_weight: string;
  other_metals: string;
  other_stones: string;
  other_charges: string;
  total_price: string;
  isInLocker: string;
  isOnDisplay: string;
  isSold: string;
  isImmediateSold: string;
  locker_details_id: string;
  Store_name: string;
  locker_number: string;
  image: string;
  mime_type: string;
  created_at: string;
  updated_at: string;
}

export interface CustomerOtcWithdrawState {
  allCustomerOtcWithdrawList: CustomerOtcWithdraw[];
  totalCustomerOtcWithdraw: number;
  isCustomerOtcWithdrawLoading: boolean;
  customerOtcWithdrawMessage: string;
  checkUserOrnament: string;
}

const initialState: CustomerOtcWithdrawState = {
  allCustomerOtcWithdrawList: [],
  totalCustomerOtcWithdraw: 0,
  isCustomerOtcWithdrawLoading: false,
  customerOtcWithdrawMessage: "",
  checkUserOrnament: "",
};

export const getCustomerOtcWithdrawListAsync = createAsyncThunk(
  "CustomerOtcWithdraw/getAllCustomerOtcWithdraw",

  async (user_id: string) => {
    const res: any = await getCustomerOTCWithdraw(user_id);
    return res.data;
  }
);

export const getCustomerOtcWithdrawRequestListAsync = createAsyncThunk(
  "CustomerOtcWithdraw/getAllCustomerOtcWithdraw",

  async ({ user_id, ornament_id }: { user_id: string; ornament_id: string }) => {
    
    const res: any = await getCustomerOTCWithdrawRequest(user_id, ornament_id);
    return res.data;
  }
);

const customerOtcWithdrawSlice = createSlice({
  name: "customerOtcWithdraw",
  initialState,
  reducers: {
    clearCustomerOtcWithdrawMessage: (state) => {
      state.customerOtcWithdrawMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCustomerOtcWithdrawListAsync.pending, (state) => {
        state.isCustomerOtcWithdrawLoading = true;
      })
      .addCase(getCustomerOtcWithdrawListAsync.fulfilled, (state, action) => {
        state.allCustomerOtcWithdrawList = action.payload.data;
        state.isCustomerOtcWithdrawLoading = false;
      })
      .addCase(getCustomerOtcWithdrawListAsync.rejected, (state) => {
        state.isCustomerOtcWithdrawLoading = false;
      })

      // .addCase(getCustomerOtcWithdrawRequestListAsync.pending, (state) => {
      //   state.isCustomerOtcWithdrawLoading = true;
      // })
      // .addCase(
      //   getCustomerOtcWithdrawRequestListAsync.fulfilled,
      //   (state, action) => {
      //     state.allCustomerOtcWithdrawList = action.payload.data;
      //     state.isCustomerOtcWithdrawLoading = false;

      //     state.checkUserOrnament = action.payload.data.ornament_id;
      //   }
      // )
      // .addCase(getCustomerOtcWithdrawRequestListAsync.rejected, (state) => {
      //   state.isCustomerOtcWithdrawLoading = false;
      // });

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

export const selectAllCustomerOtcWithdrawList = (state: RootState) =>
  state.customerOtcWithdraw.allCustomerOtcWithdrawList;
export const selectCustomerOtcWithdrawMessage = (state: RootState) =>
  state.customerOtcWithdraw.customerOtcWithdrawMessage;
export const selectCustomerOtcWithdrawLoading = (state: RootState) =>
  state.customerOtcWithdraw.isCustomerOtcWithdrawLoading;
export const selectCustomerOrnament = (state: RootState) =>
  state.customerOtcWithdraw.checkUserOrnament;
export const selectTotalCustomerOtcWithdraw = (state: RootState) =>
  state.customerOtcWithdraw.totalCustomerOtcWithdraw;

export const { clearCustomerOtcWithdrawMessage } =
  customerOtcWithdrawSlice.actions;
export default customerOtcWithdrawSlice.reducer;
