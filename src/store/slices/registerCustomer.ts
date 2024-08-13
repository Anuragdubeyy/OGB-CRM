import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getAllRegisterCustomer } from "../api/Registered/customer";

export interface RegisterCustomer {
  id: string;
  profileImage: string;
  email: string;
  name: string;
  phone: string;
  isBarter: string;
  barterWeight: string;
  isPrivilege: string;
  privilege_weight: string;
  total_weight: string;
}


export interface RegisterCustomerState {
  allRegisterCustomerList: RegisterCustomer[];
  totalRegisterCustomer: number;
  isRegisterCustomerLoading: boolean;
  registerCustomerMessage: string;
  // customerCategories: CustomerCategory[];
}

const initialState: RegisterCustomerState = {
  allRegisterCustomerList: [],
  totalRegisterCustomer: 0,
  isRegisterCustomerLoading: false,
  registerCustomerMessage: "",
};

export const getRegisterCustomerListAsync = createAsyncThunk(
  "RegisterCustomer/getAllRegisterCustomer",

  async () => {
    const res: any = await getAllRegisterCustomer();
    return res.data;
  }
);

const registerCustomerSlice = createSlice({
  name: "registerCustomer",
  initialState,
  reducers: {
    clearRegisterCustomerMessage: (state) => {
      state.registerCustomerMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getRegisterCustomerListAsync.pending, (state) => {
        state.isRegisterCustomerLoading = true;
      })
      .addCase(getRegisterCustomerListAsync.fulfilled, (state, action) => {
        state.allRegisterCustomerList = action.payload.data;
        state.isRegisterCustomerLoading = false;
      })
      .addCase(getRegisterCustomerListAsync.rejected, (state) => {
        state.isRegisterCustomerLoading = false;
      });
  },
});

export const selectAllRegisterCustomerList = (state: RootState) =>
  state.registerCustomer.allRegisterCustomerList;
export const selectRegisterCustomerMessage = (state: RootState) =>
  state.registerCustomer.registerCustomerMessage;
export const selectRegisterCustomerLoading = (state: RootState) =>
  state.registerCustomer.isRegisterCustomerLoading;
export const selectTotalRegisterCustomer = (state: RootState) =>
  state.registerCustomer.totalRegisterCustomer;

export const { clearRegisterCustomerMessage } = registerCustomerSlice.actions;
export default registerCustomerSlice.reducer;
