import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getCustomerOTCImmediateSell } from '../api/Customer/OtcImmediate';


export interface CustomerOtcImmediateSell{
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


export interface CustomerOtcImmediateSellState {
    allCustomerOtcImmediateSellList: CustomerOtcImmediateSell[];
    totalCustomerOtcImmediateSell: number;
    isCustomerOtcImmediateSellLoading: boolean;
    customerOtcImmediateSellMessage: string;

}

const initialState: CustomerOtcImmediateSellState = {
    allCustomerOtcImmediateSellList: [],
    totalCustomerOtcImmediateSell: 0,
    isCustomerOtcImmediateSellLoading: false,
    customerOtcImmediateSellMessage: '',
};


export const getCustomerOtcImmediateSellsAsync = createAsyncThunk(
    'CustomerOtcImmediateSell/getAllCustomerOtcImmediateSell',

    async (user_id:string) => {
        const res: any = await getCustomerOTCImmediateSell(user_id);
        return res.data;
        
    },
);


const customerOtcImmediateSellSlice = createSlice({
    name: 'customerOtcImmediateSell',
    initialState,
    reducers: {
    clearCustomerOtcImmediateSellMessage: state => {
        state.customerOtcImmediateSellMessage = '';
    },
    },

    extraReducers: builder => {
        builder
        .addCase(getCustomerOtcImmediateSellsAsync.pending, state => {
            state.isCustomerOtcImmediateSellLoading = true;
        })
        .addCase(getCustomerOtcImmediateSellsAsync.fulfilled, (state, action) => {
            state.allCustomerOtcImmediateSellList = action.payload.data;
            state.isCustomerOtcImmediateSellLoading = false;
        })
        .addCase(getCustomerOtcImmediateSellsAsync.rejected, state => {
            state.isCustomerOtcImmediateSellLoading = false;
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

    export const selectAllCustomerOtcImmediateSellList = (state: RootState) =>
    state.customerOtcImmediateSell.allCustomerOtcImmediateSellList;
  export const selectCustomerOtcImmediateSellMessage = (state: RootState) =>
    state.customerOtcImmediateSell.customerOtcImmediateSellMessage;
  export const selectCustomerOtcImmediateSellLoading = (state: RootState) =>
    state.customerOtcImmediateSell.isCustomerOtcImmediateSellLoading;
  export const selectTotalCustomerOtcImmediateSell = (state: RootState) =>
  state.customerOtcImmediateSell.totalCustomerOtcImmediateSell;
  
  export const { clearCustomerOtcImmediateSellMessage } = customerOtcImmediateSellSlice.actions;
  export default customerOtcImmediateSellSlice.reducer;