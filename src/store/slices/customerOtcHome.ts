import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getCustomerOTCHome } from '../api/Customer/OtcHome';


export interface CustomerOtcHome{
    ornament_id:string;
    image: string;
    ornament_name: string;
    category:string;
    gold_weight:string;
    user_name: string;
    user_phone:string;
    date:string;
    day:string;
    status:string;
}


export interface CustomerOtcHomeState {
    allCustomerOtcHomeList: CustomerOtcHome[];
    totalCustomerOtcHome: number;
    isCustomerOtcHomeLoading: boolean;
    customerOtcHomeMessage: string;

}

const initialState: CustomerOtcHomeState = {
    allCustomerOtcHomeList: [],
    totalCustomerOtcHome: 0,
    isCustomerOtcHomeLoading: false,
    customerOtcHomeMessage: '',
};


export const getCustomerOtcHomeListAsync = createAsyncThunk(
    'CustomerOtcHome/getAllCustomerOtcHome',

    async (user_id:string) => {
        const res: any = await getCustomerOTCHome(user_id);
        return res.data;
        
    },
);


const customerOtcHomeSlice = createSlice({
    name: 'customerOtcHome',
    initialState,
    reducers: {
    clearCustomerOtcHomeMessage: state => {
        state.customerOtcHomeMessage = '';
    },
    },

    extraReducers: builder => {
        builder
        .addCase(getCustomerOtcHomeListAsync.pending, state => {
            state.isCustomerOtcHomeLoading = true;
        })
        .addCase(getCustomerOtcHomeListAsync.fulfilled, (state, action) => {
            state.allCustomerOtcHomeList = action.payload.data;
            state.isCustomerOtcHomeLoading = false;
        })
        .addCase(getCustomerOtcHomeListAsync.rejected, state => {
            state.isCustomerOtcHomeLoading = false;
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

    export const selectAllCustomerOtcHomeList = (state: RootState) =>
    state.customerOtcHome.allCustomerOtcHomeList;
  export const selectCustomerOtcHomeMessage = (state: RootState) =>
    state.customerOtcHome.customerOtcHomeMessage;
  export const selectCustomerOtcHomeLoading = (state: RootState) =>
    state.customerOtcHome.isCustomerOtcHomeLoading;
  export const selectTotalCustomerOtcHome = (state: RootState) =>
  state.customerOtcHome.totalCustomerOtcHome;
  
  export const { clearCustomerOtcHomeMessage } = customerOtcHomeSlice.actions;
  export default customerOtcHomeSlice.reducer;