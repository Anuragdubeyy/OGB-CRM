import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getCustomerOTCDisplay } from '../api/Customer/OtcDispay';


export interface CustomerOtcDisplay{
    user_id: string;
    ornament_id:string;
    ornament_name:string;
    ornament_description:string;
    category:string;
    width:string;
    height:string;
    carat:string;
    status:string;
    gold_weight:string;
    total_weight:string;
    other_metals:string;
    other_stones:string;
    other_charges:string;
    total_price:string;
    isInLocker:string;
    isOnDisplay:string;
    isSold:string;
    isImmediateSold:string;
    locker_details_id:string;
    Store_name:string;
    locker_number:string;
    image:string;
    mime_type:string;
    created_at:string;
    updated_at:string;
}


export interface CustomerOtcDisplayState {
    allCustomerOtcDisplayList: CustomerOtcDisplay[];
    totalCustomerOtcDisplay: number;
    isCustomerOtcDisplayLoading: boolean;
    customerOtcDisplayMessage: string;

}

const initialState: CustomerOtcDisplayState = {
    allCustomerOtcDisplayList: [],
    totalCustomerOtcDisplay: 0,
    isCustomerOtcDisplayLoading: false,
    customerOtcDisplayMessage: '',
};


export const getCustomerOtcDisplaysAsync = createAsyncThunk(
    'CustomerOtcDisplay/getAllCustomerOtcDisplay',

    async (user_id:string) => {
        const res: any = await getCustomerOTCDisplay(user_id);
        return res.data;
        
    },
);


const customerOtcDisplaySlice = createSlice({
    name: 'customerOtcDisplay',
    initialState,
    reducers: {
    clearCustomerOtcDisplayMessage: state => {
        state.customerOtcDisplayMessage = '';
    },
    },

    extraReducers: builder => {
        builder
        .addCase(getCustomerOtcDisplaysAsync.pending, state => {
            state.isCustomerOtcDisplayLoading = true;
        })
        .addCase(getCustomerOtcDisplaysAsync.fulfilled, (state, action) => {
            state.allCustomerOtcDisplayList = action.payload.data;
            state.isCustomerOtcDisplayLoading = false;
        })
        .addCase(getCustomerOtcDisplaysAsync.rejected, state => {
            state.isCustomerOtcDisplayLoading = false;
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

    export const selectAllCustomerOtcDisplayList = (state: RootState) =>
    state.customerOtcDisplay.allCustomerOtcDisplayList;
  export const selectCustomerOtcDisplayMessage = (state: RootState) =>
    state.customerOtcDisplay.customerOtcDisplayMessage;
  export const selectCustomerOtcDisplayLoading = (state: RootState) =>
    state.customerOtcDisplay.isCustomerOtcDisplayLoading;
  export const selectTotalCustomerOtcDisplay = (state: RootState) =>
  state.customerOtcDisplay.totalCustomerOtcDisplay;
  
  export const { clearCustomerOtcDisplayMessage } = customerOtcDisplaySlice.actions;
  export default customerOtcDisplaySlice.reducer;