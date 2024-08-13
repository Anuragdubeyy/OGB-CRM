import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  getAllDepositOrnaments,
  getDepositOrnamentImages,
  updateDepositOrnaments,
} from "../api/Ornaments/DepositOrnaments";

export interface DepositOrnaments {
  ornament_id: string;
  ornament_name: string;
  category: string;
  gold_weight: string;
  total_price: string;
  image: string;
  user_name: string;
  user_mobile: string;
  deposit_date: Date;
}

export interface ImageID {
  image_id: string;
  image_path: string;
  mime_type: string;
}


export interface DepositOrnamentsState {
  allDepositOrnamentsList: DepositOrnaments[];
  totalDepositOrnaments: number;
  isDepositOrnamentsLoading: boolean;
  depositOrnamentsMessage: string;
  selectedOrnamentsImages: ImageID[];
  // customerCategories: CustomerCategory[];
}

const initialState: DepositOrnamentsState = {
  allDepositOrnamentsList: [],
  totalDepositOrnaments: 0,
  isDepositOrnamentsLoading: false,
  depositOrnamentsMessage: "",
  selectedOrnamentsImages: [],
  // customerCategories:[],
};

export const getDepositOrnamentsListAsync = createAsyncThunk(
  "depositOrnaments/getAllDepositOrnaments",

  async () => {
    const res: any = await getAllDepositOrnaments();
    return res.data;
  }
);

export const updateDepositOrnamentsAsync = createAsyncThunk(
  "diposit/updateDeposit",
  async (formData: FormData) => {
    const res: any = await updateDepositOrnaments(formData);
    return res.data;
  }
);

export const getDepositOrnamentImagesAsync = createAsyncThunk(
  "deposit/viewDeposit",
  async (ornament_id: string) => {
    const res: any = await getDepositOrnamentImages(ornament_id);
    return res.data;
  }
);

//   export const deleteCustomerAsync = createAsyncThunk(
//     'customer/deleteCustomer',
//     async (customer_id: string) => {
//       const res: any = await deleteCustomer(customer_id);
//       return res.data;
//     },
//   );

const depositOrnamentsSlice = createSlice({
  name: "depositOrnaments",
  initialState,
  reducers: {
    clearDepositOrnamentsMessage: (state) => {
      state.depositOrnamentsMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDepositOrnamentsListAsync.pending, (state) => {
        state.isDepositOrnamentsLoading = true;
      })
      .addCase(getDepositOrnamentsListAsync.fulfilled, (state, action) => {
        state.allDepositOrnamentsList = action.payload.data;
        state.isDepositOrnamentsLoading = false;
      })
      .addCase(getDepositOrnamentsListAsync.rejected, (state) => {
        state.isDepositOrnamentsLoading = false;
      })

      .addCase(updateDepositOrnamentsAsync.fulfilled, (state, action) => {
        state.allDepositOrnamentsList = state.allDepositOrnamentsList.map(
          (depositOrnaments) =>
            depositOrnaments.ornament_id === action.payload.data.ornament_id
              ? action.payload.data
              : depositOrnaments
        );
        state.depositOrnamentsMessage = action.payload.message;
        state.isDepositOrnamentsLoading = false;
      })
      .addCase(updateDepositOrnamentsAsync.pending, (state) => {
        state.isDepositOrnamentsLoading = true;
      })
      .addCase(updateDepositOrnamentsAsync.rejected, (state, action) => {
        state.isDepositOrnamentsLoading = false;
        state.depositOrnamentsMessage = action.error.message
          ? action.error.message
          : "Something went wrong";
      })

      .addCase(getDepositOrnamentImagesAsync.pending, (state) => {
        state.isDepositOrnamentsLoading = true;
      })
      .addCase(getDepositOrnamentImagesAsync.fulfilled, (state, action) => {
        state.isDepositOrnamentsLoading = false;
        state.selectedOrnamentsImages = action.payload.data;
      })
      .addCase(getDepositOrnamentImagesAsync.rejected, (state) => {
        state.isDepositOrnamentsLoading = false;
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

export const selectAllDepositOrnamentsList = (state: RootState) =>
  state.depositOrnaments.allDepositOrnamentsList;
export const selectDepositOrnamentsMessage = (state: RootState) =>
  state.depositOrnaments.depositOrnamentsMessage;
export const selectDepositOrnamentsLoading = (state: RootState) =>
  state.depositOrnaments.isDepositOrnamentsLoading;
export const selectTotalDepositOrnaments = (state: RootState) =>
  state.depositOrnaments.totalDepositOrnaments;
export const selectSelectedDepositOrnamentImages = (state: RootState) => state.depositOrnaments.selectedOrnamentsImages
export const { clearDepositOrnamentsMessage } = depositOrnamentsSlice.actions;
export default depositOrnamentsSlice.reducer;
