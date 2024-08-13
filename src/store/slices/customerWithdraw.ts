import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getCustomerWithdraw, getCustomerWithdrawRequest } from "../api/Customer/WithdrawCustomer";

export interface CustomerWithdraw {
  request_id: string;
  user_id: string;
  user_name: string;
  user_phone: string;
  user_address: string;
  status: string;
  date: string;
  time: string;
  address: string;
  ornament_id:string;
}

export interface CustomerWithdrawState {
  allCustomerWithdrawList: CustomerWithdraw[];
  totalCustomerWithdraw: number;
  isCustomerWithdrawLoading: boolean;
  customerWithdrawMessage: string;
  getOrnamentId: string;
}

const initialState: CustomerWithdrawState = {
  allCustomerWithdrawList: [],
  totalCustomerWithdraw: 0,
  isCustomerWithdrawLoading: false,
  customerWithdrawMessage: "",
  getOrnamentId: '',
};

export const getCustomerWithdrawListAsync = createAsyncThunk(
  "CustomerWithdraw/getAllCustomerWithdraw",

  async (user_id: string) => {
    const res: any = await getCustomerWithdraw(user_id);
    return res.data;
  }
);

export const getCustomerWithdrawRequestAsync = createAsyncThunk(
  "CustomerWithdrawRequest/getAllCustomerWithdrawRequest",
  async ({ user_id, ornament_id }: { user_id: string; ornament_id: string }) => {
    const res: any = await getCustomerWithdrawRequest(user_id, ornament_id);
    return res.data;
  }
);

const customerWithdrawSlice = createSlice({
  name: "customerWithdraw",
  initialState,
  reducers: {
    clearCustomerWithdrawMessage: (state) => {
      state.customerWithdrawMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCustomerWithdrawListAsync.pending, (state) => {
        state.isCustomerWithdrawLoading = true;
      })
      .addCase(getCustomerWithdrawListAsync.fulfilled, (state, action) => {
        state.allCustomerWithdrawList = action.payload.data;
        state.isCustomerWithdrawLoading = false;
        state.getOrnamentId = action.payload.data
      })
      .addCase(getCustomerWithdrawListAsync.rejected, (state) => {
        state.isCustomerWithdrawLoading = false;
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

export const selectAllCustomerWithdrawList = (state: RootState) =>
  state.customerWithdraw.allCustomerWithdrawList;
export const selectCustomerWithdrawMessage = (state: RootState) =>
  state.customerWithdraw.customerWithdrawMessage;
export const selectCustomerWithdrawLoading = (state: RootState) =>
  state.customerWithdraw.isCustomerWithdrawLoading;
export const selectTotalCustomerWithdraw = (state: RootState) =>
  state.customerWithdraw.totalCustomerWithdraw;
  export const selectCustomerOrnamentId = (state: RootState) =>
  state.customerWithdraw.getOrnamentId;

export const { clearCustomerWithdrawMessage } = customerWithdrawSlice.actions;
export default customerWithdrawSlice.reducer;
