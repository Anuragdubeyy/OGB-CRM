import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getAllByOrder } from '../api/ByOrder';
// import { deleteCustomer, getAllCustomers } from '../api/customerAPI';
// import { getAllByOrder } from '../api/ByOrder';

export interface ByOrder{
    ornament_id: string;
    ornament_name: string;
    ornament_description:string;
    ornament_category:string;
    category: string;
    gold_weight:string;
    total_price:string;
    image:string;
    user_name:string;
    user_mobile:string;
    status:string;
    quantity:string;
    date:Date;
}

// interface Category {
//     name: string;
//     _id: string;
//     isDeleted: boolean;
//     isActive: boolean;
//   }

  export interface ByOrderState {
    allByOrderList: ByOrder[];
    totalByOrder: number;
    isByOrderLoading: boolean;
    byOrderMessage: string;
    // customerCategories: CustomerCategory[];

  }

  const initialState: ByOrderState = {
    allByOrderList: [],
    totalByOrder: 0,
    isByOrderLoading: false,
    byOrderMessage: '',
    // customerCategories:[],
  };


  export const getByOrderListAsync = createAsyncThunk(
    'byOrder/getAllByOrder',
   
    async () => {
        const res: any = await getAllByOrder();
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

  const byOrderSlice = createSlice({
    name: 'byOrder',
    initialState,
    reducers: {
      clearByOrderMessage: state => {
        state.byOrderMessage = '';
      },
      
    },

    extraReducers: builder => {
        builder
          .addCase(getByOrderListAsync.pending, state => {
            state.isByOrderLoading = true;
          })
          .addCase(getByOrderListAsync.fulfilled, (state, action) => {
            state.allByOrderList = action.payload.data;
            state.isByOrderLoading = false;
          })
          .addCase(getByOrderListAsync.rejected, state => {
            state.isByOrderLoading = false;
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

    export const selectAllByOrderList = (state: RootState) =>
    state.byOrder.allByOrderList;
  export const selectByOrderMessage = (state: RootState) =>
    state.byOrder.byOrderMessage;
  export const selectByOrderLoading = (state: RootState) =>
    state.byOrder.isByOrderLoading;
  export const selectTotalByOrder = (state: RootState) =>
  state.byOrder.totalByOrder;
  
  export const { clearByOrderMessage } = byOrderSlice.actions;
  export default byOrderSlice.reducer;