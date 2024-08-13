import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getAllBarterHistory } from '../api/Barter/BarterHistory';
import { RootState } from '..';

export interface BarterHistory{
    ornament_id: string;
    ornament_name: string;
    category: string;
    gold_weight:string;
    image:string;
    barterer_name:string;
    barterer_mobile:string;
    barterer_email:string;
    barterer_address:string;
    date:Date;
    status:string;
    owner_details:string;
    
    
}

// interface Category {
//     name: string;
//     _id: string;
//     isDeleted: boolean;
//     isActive: boolean;
//   }

  export interface BarterHistoryState {
    allBarterHistoryList: BarterHistory[];
    totalBarterHistory: number;
    isBarterHistoryLoading: boolean;
    barterHistoryMessage: string;
    // customerCategories: CustomerCategory[];

  }

  const initialState: BarterHistoryState = {
    allBarterHistoryList: [],
    totalBarterHistory: 0,
    isBarterHistoryLoading: false,
    barterHistoryMessage: '',
    // customerCategories:[],
  };


  export const getBarterHistoryListAsync = createAsyncThunk(
    'barterHistory/getAllBarterHistory',
   
    async () => {
        const res: any = await getAllBarterHistory();
        return res.data;
       
      },
  );

//   export const deleteCustomerAsync = createAsyncThunk(
//     'customer/deleteCustomer',
//     async (customer_id: string) => {
//       const res: any = await deleteCustomer(customer_id);
//       return res.data;
//     },
//   );

  const barterHistorySlice = createSlice({
    name: 'barterHistory',
    initialState,
    reducers: {
      clearBarterHistoryMessage: state => {
        state.barterHistoryMessage = '';
      },
      
    },

    extraReducers: builder => {
        builder
          .addCase(getBarterHistoryListAsync.pending, state => {
            state.isBarterHistoryLoading = true;
          })
          .addCase(getBarterHistoryListAsync.fulfilled, (state, action) => {
            state.allBarterHistoryList = action.payload.data;
            state.isBarterHistoryLoading = false;
          })
          .addCase(getBarterHistoryListAsync.rejected, state => {
            state.isBarterHistoryLoading = false;
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

    export const selectAllBarterHistoryList = (state: RootState) =>
    state.barterHistory.allBarterHistoryList;
  export const selectBarterHistoryMessage = (state: RootState) =>
    state.barterHistory.barterHistoryMessage;
  export const selectBarterHistoryLoading = (state: RootState) =>
    state.barterHistory.isBarterHistoryLoading;
  export const selectTotalBarterHistory = (state: RootState) =>
  state.barterHistory.totalBarterHistory;
  
  export const { clearBarterHistoryMessage } = barterHistorySlice.actions;
  export default barterHistorySlice.reducer;