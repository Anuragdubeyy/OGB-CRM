import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getCustomerOTCBarter, getCustomerOTCBarterAdd, getCustomerOTCBarterRemove } from '../api/Customer/OtcBarter';


export interface CustomerOtcBarter{
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


export interface CustomerOtcBarterState {
    allCustomerOtcBarterList: CustomerOtcBarter[];
    totalCustomerOtcBarter: number;
    isCustomerOtcBarterLoading: boolean;
    customerOtcBarterMessage: string;

}

const initialState: CustomerOtcBarterState = {
    allCustomerOtcBarterList: [],
    totalCustomerOtcBarter: 0,
    isCustomerOtcBarterLoading: false,
    customerOtcBarterMessage: '',
};


export const getCustomerOtcBarterListAsync = createAsyncThunk(
    'CustomerOtcBarter/getAllCustomerOtcBarter',

    async (user_id:string) => {
        const res: any = await getCustomerOTCBarter(user_id);
        return res.data;
        
    },
);

export const getCustomerOtcBarterAddAsync = createAsyncThunk(
    "CustomerOtcBarter/getAllCustomerOtcBarter",
  
    async ({ userid, ornament_id }: { userid: string; ornament_id: string }) => {
      
      const res: any = await getCustomerOTCBarterAdd(userid, ornament_id);
      return res.data;
    }
  );

  export const getCustomerOtcBarterRemoveAsync = createAsyncThunk(
    "CustomerOtcBarter/getAllCustomerOtcBarter",
  
    async ({ userid, ornament_id }: { userid: string; ornament_id: string }) => {
      
      const res: any = await getCustomerOTCBarterRemove(userid, ornament_id);
      return res.data;
    }
  );


const customerOtcBarterSlice = createSlice({
    name: 'customerOtcBarter',
    initialState,
    reducers: {
    clearCustomerOtcBarterMessage: state => {
        state.customerOtcBarterMessage = '';
    },
    },

    extraReducers: builder => {
        builder
        .addCase(getCustomerOtcBarterListAsync.pending, state => {
            state.isCustomerOtcBarterLoading = true;
        })
        .addCase(getCustomerOtcBarterListAsync.fulfilled, (state, action) => {
            state.allCustomerOtcBarterList = action.payload.data;
            state.isCustomerOtcBarterLoading = false;
        })
        .addCase(getCustomerOtcBarterListAsync.rejected, state => {
            state.isCustomerOtcBarterLoading = false;
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

    export const selectAllCustomerOtcBarterList = (state: RootState) =>
    state.customerOtcBarter.allCustomerOtcBarterList;
  export const selectCustomerOtcBarterMessage = (state: RootState) =>
    state.customerOtcBarter.customerOtcBarterMessage;
  export const selectCustomerOtcBarterLoading = (state: RootState) =>
    state.customerOtcBarter.isCustomerOtcBarterLoading;
  export const selectTotalCustomerOtcBarter = (state: RootState) =>
  state.customerOtcBarter.totalCustomerOtcBarter;
  
  export const { clearCustomerOtcBarterMessage } = customerOtcBarterSlice.actions;
  export default customerOtcBarterSlice.reducer;