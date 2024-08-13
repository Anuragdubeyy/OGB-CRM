import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getCustomerDeposit } from '../api/Customer/DepositCustomer';


export interface CustomerDeposit{
    request_id: string;
    user_id: string;
    user_name:string;
    user_phone:string;
    user_address: string;
    status:string;
    date:string;
    time:string;
    address:string;
    
}


  export interface CustomerDepositState {
    allCustomerDepositList: CustomerDeposit[];
    totalCustomerDeposit: number;
    isCustomerDepositLoading: boolean;
    customerDepositMessage: string;

  }

  const initialState: CustomerDepositState = {
    allCustomerDepositList: [],
    totalCustomerDeposit: 0,
    isCustomerDepositLoading: false,
    customerDepositMessage: '',
  };


  export const getCustomerDepositListAsync = createAsyncThunk(
    'CustomerDeposit/getAllCustomerDeposit',
   
    async (user_id:string) => {
        const res: any = await getCustomerDeposit(user_id);
        return res.data;
        
    },
  );


  const customerDepositSlice = createSlice({
    name: 'customerDeposit',
    initialState,
    reducers: {
      clearCustomerDepositMessage: state => {
        state.customerDepositMessage = '';
      },
      
    },

    extraReducers: builder => {
        builder
          .addCase(getCustomerDepositListAsync.pending, state => {
            state.isCustomerDepositLoading = true;
        })
        .addCase(getCustomerDepositListAsync.fulfilled, (state, action) => {
            state.allCustomerDepositList = action.payload.data;
            state.isCustomerDepositLoading = false;
        })
        .addCase(getCustomerDepositListAsync.rejected, state => {
            state.isCustomerDepositLoading = false;
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

    export const selectAllCustomerDepositList = (state: RootState) =>
    state.customerDeposit.allCustomerDepositList;
  export const selectCustomerDepositMessage = (state: RootState) =>
    state.customerDeposit.customerDepositMessage;
  export const selectCustomerDepositLoading = (state: RootState) =>
    state.customerDeposit.isCustomerDepositLoading;
  
  export const selectTotalCustomerDeposit = (state: RootState) =>
  state.customerDeposit.totalCustomerDeposit;
  
  export const { clearCustomerDepositMessage } = customerDepositSlice.actions;
  export default customerDepositSlice.reducer;