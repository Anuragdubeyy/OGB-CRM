import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
// import { deleteCustomer, getAllCustomers } from '../api/customerAPI';
import { getAllBarterGiven } from '../api/Barter/BarterGiven';

export interface BarterGiven{
    ornament_id: string;
    ornament_name: string;
    ornament_description:string;
    category: string;
    width:string;
    height:string;
    carat:string;
    gold_weight:string;
    other_stones:string;
    other_metals:string;
    other_charges:string;
    total_price:string;
    image:string;
    user_name:string;
    user_mobile:string;
    date:Date;
    
    
}

// interface Category {
//     name: string;
//     _id: string;
//     isDeleted: boolean;
//     isActive: boolean;
//   }

  export interface BarterGivenState {
    allBarterGivenList: BarterGiven[];
    totalBarterGiven: number;
    isBarterGivenLoading: boolean;
    barterGivenMessage: string;
    // customerCategories: CustomerCategory[];

  }

  const initialState: BarterGivenState = {
    allBarterGivenList: [],
    totalBarterGiven: 0,
    isBarterGivenLoading: false,
    barterGivenMessage: '',
    // customerCategories:[],
  };


  export const getBarterGivenListAsync = createAsyncThunk(
    'barterGiven/getAllBarterGiven',
   
    async () => {
        const res: any = await getAllBarterGiven();
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

  const barterGivenSlice = createSlice({
    name: 'barterGiven',
    initialState,
    reducers: {
      clearBarterGivenMessage: state => {
        state.barterGivenMessage = '';
      },
      
    },

    extraReducers: builder => {
        builder
          .addCase(getBarterGivenListAsync.pending, state => {
            state.isBarterGivenLoading = true;
          })
          .addCase(getBarterGivenListAsync.fulfilled, (state, action) => {
            state.allBarterGivenList = action.payload.data;
            state.isBarterGivenLoading = false;
          })
          .addCase(getBarterGivenListAsync.rejected, state => {
            state.isBarterGivenLoading = false;
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

    export const selectAllBarterGivenList = (state: RootState) =>
    state.barterGiven.allBarterGivenList;
  export const selectBarterGivenMessage = (state: RootState) =>
    state.barterGiven.barterGivenMessage;
  export const selectBarterGivenLoading = (state: RootState) =>
    state.barterGiven.isBarterGivenLoading;
  export const selectTotalBarterGiven = (state: RootState) =>
  state.barterGiven.totalBarterGiven;
  
  export const { clearBarterGivenMessage } = barterGivenSlice.actions;
  export default barterGivenSlice.reducer;