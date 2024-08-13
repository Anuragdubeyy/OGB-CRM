import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllAlertDetails } from "../api/Dashboard/Overview";
import { RootState } from "..";

export interface BarterAlert {
  BarterdaysAhead: string;
  user: string;
  userImage: string;
}

export interface LoanAlert {
  user: string;
  userImage: string;
  daysAhead: string;
}

export interface AllAlertState {
  allAlertList: {
    loanAlert: LoanAlert[];
    barterAlert: BarterAlert[];
  };
  totalAllAlertOverview: number;
  isAllAlertLoading: boolean;
  allAlertMessage: string;
}

const initialState: AllAlertState = {
  allAlertList: {
    loanAlert: [],
    barterAlert: [],
  },
  totalAllAlertOverview: 0,
  isAllAlertLoading: false,
  allAlertMessage: "",
};

export const getAllAlertListAsync = createAsyncThunk(
  "allAlertList/getAllAlertList",
  async () => {
    const res: any = await getAllAlertDetails();
    return res.data;
  }
);

const allAlertSlice = createSlice({
  name: "allAlertList",
  initialState,
  reducers: {
    clearAllAdminMessage: (state) => {
      state.allAlertMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllAlertListAsync.pending, (state) => {
        state.isAllAlertLoading = true;
      })
      .addCase(getAllAlertListAsync.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.allAlertList = action.payload.data;
        }
        state.isAllAlertLoading = false;
      })
      .addCase(getAllAlertListAsync.rejected, (state) => {
        state.isAllAlertLoading = false;
      });
  },
});

export const selectAllAlertList = (state: RootState) => state.allAlert.allAlertList;
export const selectAllAlertMessage = (state: RootState) => state.allAlert.allAlertMessage;
export const selectAllAlertLoading = (state: RootState) => state.allAlert.isAllAlertLoading;
export const selectTotalAllAlertList = (state: RootState) => state.allAlert.totalAllAlertOverview;

export const { clearAllAdminMessage } = allAlertSlice.actions;
export default allAlertSlice.reducer;
