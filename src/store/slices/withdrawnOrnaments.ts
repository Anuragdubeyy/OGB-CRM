import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getAllWithdrawnOrnaments } from '../api/Ornaments/WithdrawnOrnaments';

export interface WithdrawnOrnaments{
    ornament_id: string;
    ornament_name: string;
    category: string;
    gold_weight:string;
    // carat:string;
    // height: string;
    // width: string;
    // other_stones:string;
    // other_metals:string;
    // other_charges:string;
    user_name:string;
    user_mobile:string;
    total_price:string;
    image:string;
    date:Date;
    
}

// interface Category {
//     name: string;
//     _id: string;
//     isDeleted: boolean;
//     isActive: boolean;
//   }

  export interface WithdrawnOrnamentsState {
    allWithdrawnOrnamentsList: WithdrawnOrnaments[];
    totalWithdrawnOrnaments: number;
    isWithdrawnOrnamentsLoading: boolean;
    withdrawnOrnamentsMessage: string;
    // customerCategories: CustomerCategory[];

  }

  const initialState: WithdrawnOrnamentsState = {
    allWithdrawnOrnamentsList: [],
    totalWithdrawnOrnaments: 0,
    isWithdrawnOrnamentsLoading: false,
    withdrawnOrnamentsMessage: '',
    // customerCategories:[],
  };


  export const getWithdrawnOrnamentsListAsync = createAsyncThunk(
    'withdrawnOrnaments/getAllWithdrawnOrnaments',
   
    async () => {
        const res: any = await getAllWithdrawnOrnaments();
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

  const withdrawnOrnamentsSlice = createSlice({
    name: 'withdrawnOrnaments',
    initialState,
    reducers: {
      clearWithdrawnOrnamentsMessage: state => {
        state.withdrawnOrnamentsMessage = '';
      },
      
    },

    extraReducers: builder => {
        builder
          .addCase(getWithdrawnOrnamentsListAsync.pending, state => {
            state.isWithdrawnOrnamentsLoading = true;
          })
          .addCase(getWithdrawnOrnamentsListAsync.fulfilled, (state, action) => {
            state.allWithdrawnOrnamentsList = action.payload.data;
            state.isWithdrawnOrnamentsLoading = false;
          })
          .addCase(getWithdrawnOrnamentsListAsync.rejected, state => {
            state.isWithdrawnOrnamentsLoading = false;
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

    export const selectAllWithdrawnOrnamentsList = (state: RootState) =>
    state.withdrawnOrnaments.allWithdrawnOrnamentsList;
  export const selectWithdrawnOrnamentsMessage = (state: RootState) =>
    state.withdrawnOrnaments.withdrawnOrnamentsMessage;
  export const selectWithdrawnOrnamentsLoading = (state: RootState) =>
    state.withdrawnOrnaments.isWithdrawnOrnamentsLoading;
  export const selectTotalWithdrawnOrnaments = (state: RootState) =>
  state.withdrawnOrnaments.totalWithdrawnOrnaments;
  
  export const { clearWithdrawnOrnamentsMessage } = withdrawnOrnamentsSlice.actions;
  export default withdrawnOrnamentsSlice.reducer;