import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getCustomerOrder } from '../api/Customer/OrderCustomer';


export interface CustomerOrder{
    id: string;
    user_id: string;
    ornament_id:string;
    isDisplay:string;
    isPremium: string;
    isBarter:string;
    status:string;
    address_id:string;
    payment_id:string;
    quantity:string;
    created_at:string;
    updated_at:string;
}


export interface CustomerOrderState {
    allCustomerOrderList: CustomerOrder[];
    totalCustomerOrder: number;
    isCustomerOrderLoading: boolean;
    customerOrderMessage: string;

}

const initialState: CustomerOrderState = {
    allCustomerOrderList: [],
    totalCustomerOrder: 0,
    isCustomerOrderLoading: false,
    customerOrderMessage: '',
};


export const getCustomerOrderListAsync = createAsyncThunk(
    'CustomerOrder/getAllCustomerOrder',

    async (user_id:string) => {
        const res: any = await getCustomerOrder(user_id);
        return res.data;
        
    },
);


const customerOrderSlice = createSlice({
    name: 'customerOrder',
    initialState,
    reducers: {
    clearCustomerOrderMessage: state => {
        state.customerOrderMessage = '';
    },
    },

    extraReducers: builder => {
        builder
        .addCase(getCustomerOrderListAsync.pending, state => {
            state.isCustomerOrderLoading = true;
        })
        .addCase(getCustomerOrderListAsync.fulfilled, (state, action) => {
            state.allCustomerOrderList = action.payload.data;
            state.isCustomerOrderLoading = false;
        })
        .addCase(getCustomerOrderListAsync.rejected, state => {
            state.isCustomerOrderLoading = false;
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

    export const selectAllCustomerOrderList = (state: RootState) =>
    state.customerOrder.allCustomerOrderList;
  export const selectCustomerOrderMessage = (state: RootState) =>
    state.customerOrder.customerOrderMessage;
  export const selectCustomerOrderLoading = (state: RootState) =>
    state.customerOrder.isCustomerOrderLoading;
  export const selectTotalCustomerOrder = (state: RootState) =>
  state.customerOrder.totalCustomerOrder;
  
  export const { clearCustomerOrderMessage } = customerOrderSlice.actions;
  export default customerOrderSlice.reducer;