import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getAllNotification } from "../api/Topbar/notificationAPI";

export interface Notification {
    notification_type: string;
    name: string;
    message: string;
}


export interface AllNotificationState {
  allNotificationList: Notification[]
  totalAllNotificationOverview: number;
  isAllNotificationLoading: boolean;
  allNotificationMessage: string;
}

const initialState: AllNotificationState = {
  allNotificationList:[],
  totalAllNotificationOverview: 0,
  isAllNotificationLoading: false,
  allNotificationMessage: "",
};

export const getAllNotificationListAsync = createAsyncThunk(
  "allNotificationList/getAllNotificationList",
  async () => {
    const res: any = await getAllNotification();
    return res.data;
  }
);

const allNotificationSlice = createSlice({
  name: "allNotificationList",
  initialState,
  reducers: {
    clearAllAdminMessage: (state) => {
      state.allNotificationMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllNotificationListAsync.pending, (state) => {
        state.isAllNotificationLoading = true;
      })
      .addCase(getAllNotificationListAsync.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.allNotificationList = action.payload.data;
        }
        state.isAllNotificationLoading = false;
      })
      .addCase(getAllNotificationListAsync.rejected, (state) => {
        state.isAllNotificationLoading = false;
      });
  },
});

export const selectAllNotificationList = (state: RootState) => state.notification.allNotificationList;
export const selectAllNotificationMessage = (state: RootState) => state.notification.allNotificationMessage;
export const selectAllNotificationLoading = (state: RootState) => state.notification.isAllNotificationLoading;
export const selectTotalAllNotificationList = (state: RootState) => state.notification.totalAllNotificationOverview;

export const { clearAllAdminMessage } = allNotificationSlice.actions;
export default allNotificationSlice.reducer;
