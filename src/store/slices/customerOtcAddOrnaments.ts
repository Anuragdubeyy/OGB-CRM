import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { addOtcOrnaments } from '../api/Customer/OtcAddOrnaments';


export interface CustomerOtcAddOrnaments{
    userid: string;
    ornament_id:string;
    ornament_name:string;
    ornament_description:string;
    category:string;
    width:string;
    height:string;
    carat:string;
    gold_weight:string;
    other_stones:string;
    other_metals:string;
    other_charges:string;
    locker_number:string;
    image:string;
    total_weight:string;
}


export interface CustomerOtcAddOrnamentsState {
    allCustomerOtcAddOrnamentsList: CustomerOtcAddOrnaments[];
    totalCustomerOtcAddOrnaments: number;
    isCustomerOtcAddOrnamentsLoading: boolean;
    customerOtcAddOrnamentsMessage: string;

}

const initialState: CustomerOtcAddOrnamentsState = {
    allCustomerOtcAddOrnamentsList: [],
    totalCustomerOtcAddOrnaments: 0,
    isCustomerOtcAddOrnamentsLoading: false,
    customerOtcAddOrnamentsMessage: '',
};



export const addOtcOrnamentsAsync = createAsyncThunk(
    'addOtcOrnaments/AddOtcOrnaments',

    async (formData:FormData) => {
        const res: any = await addOtcOrnaments(formData);
        return res.data;
      
    },
  );


const customerOtcAddOrnamentsSlice = createSlice({
    name: 'customerOtcAddOrnaments',
    initialState,
    reducers: {
    clearCustomerOtcAddOrnamentsMessage: state => {
        state.customerOtcAddOrnamentsMessage = '';
    },
    },

    extraReducers: builder => {
        builder
        .addCase(addOtcOrnamentsAsync.fulfilled, (state, action) => {
            state.allCustomerOtcAddOrnamentsList = state.allCustomerOtcAddOrnamentsList.map(customerOtcAddOrnaments =>
                customerOtcAddOrnaments.userid === action.payload.data.userid
                ? action.payload.data
                : customerOtcAddOrnaments,
            );
            state.customerOtcAddOrnamentsMessage = action.payload.message;
            state.isCustomerOtcAddOrnamentsLoading = false;
          })
          .addCase(addOtcOrnamentsAsync.pending, state => {
            state.isCustomerOtcAddOrnamentsLoading = true;
          })
          .addCase(addOtcOrnamentsAsync.rejected, (state, action) => {
            state.isCustomerOtcAddOrnamentsLoading = false;
            state.customerOtcAddOrnamentsMessage = action.error.message
              ? action.error.message
              : 'Something went wrong';
          })

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

    export const selectAllCustomerOtcAddOrnamentsList = (state: RootState) =>
    state.customerOtcAddOrnaments.allCustomerOtcAddOrnamentsList;
  export const selectCustomerOtcAddOrnamentsMessage = (state: RootState) =>
    state.customerOtcAddOrnaments.customerOtcAddOrnamentsMessage;
  export const selectCustomerOtcAddOrnamentsLoading = (state: RootState) =>
    state.customerOtcAddOrnaments.isCustomerOtcAddOrnamentsLoading;
  export const selectTotalCustomerOtcAddOrnaments = (state: RootState) =>
  state.customerOtcAddOrnaments.totalCustomerOtcAddOrnaments;
  
  export const { clearCustomerOtcAddOrnamentsMessage } = customerOtcAddOrnamentsSlice.actions;
  export default customerOtcAddOrnamentsSlice.reducer;