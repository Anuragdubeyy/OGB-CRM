import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getAllDisplayOrnaments } from '../api/Ornaments/DisplayOrnaments';

export interface DisplayOrnaments{
    ornament_id: string;
    ornament_name: string;
    category: string;
    gold_weight:string;
    carat:string;
    height: string;
    width: string;
    other_stone:string;
    other_metal:string;
    other_charge:string;
    total_price:string;
    image:string;
    
}

// interface Category {
//     name: string;
//     _id: string;
//     isDeleted: boolean;
//     isActive: boolean;
//   }

  export interface DisplayOrnamentsState {
    allDisplayOrnamentsList: DisplayOrnaments[];
    totalDisplayOrnaments: number;
    isDisplayOrnamentsLoading: boolean;
    displayOrnamentsMessage: string;
    // customerCategories: CustomerCategory[];

  }

  const initialState: DisplayOrnamentsState = {
    allDisplayOrnamentsList: [],
    totalDisplayOrnaments: 0,
    isDisplayOrnamentsLoading: false,
    displayOrnamentsMessage: '',
    // customerCategories:[],
  };


  export const getDisplayOrnamentsListAsync = createAsyncThunk(
    'displayOrnaments/getAllDisplayOrnaments',
   
    async () => {
        const res: any = await getAllDisplayOrnaments();
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

  const displayOrnamentsSlice = createSlice({
    name: 'displayOrnaments',
    initialState,
    reducers: {
      clearDisplayOrnamentsMessage: state => {
        state.displayOrnamentsMessage = '';
      },
      
    },

    extraReducers: builder => {
        builder
          .addCase(getDisplayOrnamentsListAsync.pending, state => {
            state.isDisplayOrnamentsLoading = true;
          })
          .addCase(getDisplayOrnamentsListAsync.fulfilled, (state, action) => {
            state.allDisplayOrnamentsList = action.payload.data;
            state.isDisplayOrnamentsLoading = false;
          })
          .addCase(getDisplayOrnamentsListAsync.rejected, state => {
            state.isDisplayOrnamentsLoading = false;
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

    export const selectAllDisplayOrnamentsList = (state: RootState) =>
    state.displayOrnaments.allDisplayOrnamentsList;
  export const selectDisplayOrnamentsMessage = (state: RootState) =>
    state.displayOrnaments.displayOrnamentsMessage;
  export const selectDisplayOrnamentsLoading = (state: RootState) =>
    state.displayOrnaments.isDisplayOrnamentsLoading;
  export const selectTotalDisplayOrnaments = (state: RootState) =>
  state.displayOrnaments.totalDisplayOrnaments;
  
  export const { clearDisplayOrnamentsMessage } = displayOrnamentsSlice.actions;
  export default displayOrnamentsSlice.reducer;