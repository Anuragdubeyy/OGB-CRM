import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getCustomerOTCBarterList } from '../api/Customer/OtcBarterList';


export interface CustomerOtcBarterList{
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


export interface CustomerOtcBarterListState {
    allCustomerOtcBarterListList: CustomerOtcBarterList[];
    totalCustomerOtcBarterList: number;
    isCustomerOtcBarterListLoading: boolean;
    customerOtcBarterListMessage: string;

}

const initialState: CustomerOtcBarterListState = {
    allCustomerOtcBarterListList: [],
    totalCustomerOtcBarterList: 0,
    isCustomerOtcBarterListLoading: false,
    customerOtcBarterListMessage: '',
};


export const getCustomerOtcBarterListsAsync = createAsyncThunk(
    'CustomerOtcBarterList/getAllCustomerOtcBarterList',

    async (user_id:string) => {
        const res: any = await getCustomerOTCBarterList(user_id);
        return res.data;
        
    },
);


const customerOtcBarterListSlice = createSlice({
    name: 'customerOtcBarterList',
    initialState,
    reducers: {
    clearCustomerOtcBarterListMessage: state => {
        state.customerOtcBarterListMessage = '';
    },
    },

    extraReducers: builder => {
        builder
        .addCase(getCustomerOtcBarterListsAsync.pending, state => {
            state.isCustomerOtcBarterListLoading = true;
        })
        .addCase(getCustomerOtcBarterListsAsync.fulfilled, (state, action) => {
            state.allCustomerOtcBarterListList = action.payload.data;
            state.isCustomerOtcBarterListLoading = false;
        })
        .addCase(getCustomerOtcBarterListsAsync.rejected, state => {
            state.isCustomerOtcBarterListLoading = false;
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

    export const selectAllCustomerOtcBarterListList = (state: RootState) =>
    state.customerOtcBarterList.allCustomerOtcBarterListList;
  export const selectCustomerOtcBarterListMessage = (state: RootState) =>
    state.customerOtcBarterList.customerOtcBarterListMessage;
  export const selectCustomerOtcBarterListLoading = (state: RootState) =>
    state.customerOtcBarterList.isCustomerOtcBarterListLoading;
  export const selectTotalCustomerOtcBarterList = (state: RootState) =>
  state.customerOtcBarterList.totalCustomerOtcBarterList;
  
  export const { clearCustomerOtcBarterListMessage } = customerOtcBarterListSlice.actions;
  export default customerOtcBarterListSlice.reducer;