import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getAllRegisterLocker } from "../api/Registered/lockerApi";

export interface RegisterLocker {
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


export interface RegisterLockerState {
  allRegisterLockerList: RegisterLocker[];
  totalRegisterLocker: number;
  isRegisterLockerLoading: boolean;
  registerLockerMessage: string;
  // customerCategories: CustomerCategory[];
}

const initialState: RegisterLockerState = {
  allRegisterLockerList: [],
  totalRegisterLocker: 0,
  isRegisterLockerLoading: false,
  registerLockerMessage: "",
};

export const getRegisterLockerListAsync = createAsyncThunk(
  "RegisterLocker/getAllRegisterLocker",

  async () => {
    const res: any = await getAllRegisterLocker();
    return res.data;
  }
);

const RegisterLockerSlice = createSlice({
  name: "RegisterLocker",
  initialState,
  reducers: {
    clearRegisterLockerMessage: (state) => {
      state.registerLockerMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getRegisterLockerListAsync.pending, (state) => {
        state.isRegisterLockerLoading = true;
      })
      .addCase(getRegisterLockerListAsync.fulfilled, (state, action) => {
        state.allRegisterLockerList = action.payload.data;
        state.isRegisterLockerLoading = false;
      })
      .addCase(getRegisterLockerListAsync.rejected, (state) => {
        state.isRegisterLockerLoading = false;
      });
  },
});

export const selectAllRegisterLockerList = (state: RootState) =>
  state.registerLocker.allRegisterLockerList;
export const selectRegisterLockerMessage = (state: RootState) =>
  state.registerLocker.registerLockerMessage;
export const selectRegisterLockerLoading = (state: RootState) =>
  state.registerLocker.isRegisterLockerLoading;
export const selectTotalRegisterLocker = (state: RootState) =>
  state.registerLocker.totalRegisterLocker;

export const { clearRegisterLockerMessage } = RegisterLockerSlice.actions;
export default RegisterLockerSlice.reducer;
