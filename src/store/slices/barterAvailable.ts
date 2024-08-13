import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
// import { deleteCustomer, getAllCustomers } from '../api/customerAPI';
import { getAllBarterAvailable } from '../api/Barter/BarterAvailable';

export interface BarterAvailable{
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
    status:string;
    
}

// interface Category {
//     name: string;
//     _id: string;
//     isDeleted: boolean;
//     isActive: boolean;
//   }

  export interface BarterAvailableState {
    allBarterAvailableList: BarterAvailable[];
    totalBarterAvailable: number;
    isBarterAvailableLoading: boolean;
    barterAvailableMessage: string;
    // customerCategories: CustomerCategory[];

  }

  const initialState: BarterAvailableState = {
    allBarterAvailableList: [],
    totalBarterAvailable: 0,
    isBarterAvailableLoading: false,
    barterAvailableMessage: '',
    // customerCategories:[],
  };


  export const getBarterAvailableListAsync = createAsyncThunk(
    'barterAvailable/getAllBarterAvailable',
   
    async () => {
        const res: any = await getAllBarterAvailable();
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

  const barterAvailableSlice = createSlice({
    name: 'barterAvailable',
    initialState,
    reducers: {
      clearBarterAvailableMessage: state => {
        state.barterAvailableMessage = '';
      },
      
    },

    extraReducers: builder => {
        builder
          .addCase(getBarterAvailableListAsync.pending, state => {
            state.isBarterAvailableLoading = true;
          })
          .addCase(getBarterAvailableListAsync.fulfilled, (state, action) => {
            state.allBarterAvailableList = action.payload.data;
            state.isBarterAvailableLoading = false;
          })
          .addCase(getBarterAvailableListAsync.rejected, state => {
            state.isBarterAvailableLoading = false;
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

    export const selectAllBarterAvailableList = (state: RootState) =>
    state.barterAvailable.allBarterAvailableList;
  export const selectBarterAvailableMessage = (state: RootState) =>
    state.barterAvailable.barterAvailableMessage;
  export const selectBarterAvailableLoading = (state: RootState) =>
    state.barterAvailable.isBarterAvailableLoading;
  export const selectTotalBarterAvailable = (state: RootState) =>
  state.barterAvailable.totalBarterAvailable;
  
  export const { clearBarterAvailableMessage } = barterAvailableSlice.actions;
  export default barterAvailableSlice.reducer;