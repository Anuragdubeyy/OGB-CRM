import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getAllSoldOrnaments } from '../api/Ornaments/SoldOrnaments';
// import { getAllLockerOrnaments } from '../api/Ornaments/LockerOrnaments';

export interface SoldOrnaments{
    ornament_id: string;
    ornament_name: string;
    category: string;
    gold_weight:string;
    total_price:string;
    carat:string;
    height:string;
    width:string;
    other_charge:string;
    image:string;
    

}

  export interface SoldOrnamentsState {
    allSoldOrnamentsList: SoldOrnaments[];
    totalSoldOrnaments: number;
    isSoldOrnamentsLoading: boolean;
    soldOrnamentsMessage: string;

  }

  const initialState: SoldOrnamentsState = {
    allSoldOrnamentsList: [],
    totalSoldOrnaments: 0,
    isSoldOrnamentsLoading: false,
    soldOrnamentsMessage: '',
    // customerCategories:[],
  };


  export const getSoldOrnamentsListAsync = createAsyncThunk(
    'lockerOrnaments/getAllLockerOrnaments',
   
    async () => {
        const res: any = await getAllSoldOrnaments();
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

  const soldOrnamentsSlice = createSlice({
    name: 'soldOrnaments',
    initialState,
    reducers: {
      clearSoldOrnamentsMessage: state => {
        state.soldOrnamentsMessage = '';
      },
      
    },

    extraReducers: builder => {
        builder
          .addCase(getSoldOrnamentsListAsync.pending, state => {
            state.isSoldOrnamentsLoading = true;
          })
          .addCase(getSoldOrnamentsListAsync.fulfilled, (state, action) => {
            state.allSoldOrnamentsList = action.payload.data;
            state.isSoldOrnamentsLoading = false;
          })
          .addCase(getSoldOrnamentsListAsync.rejected, state => {
            state.isSoldOrnamentsLoading = false;
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

    export const selectAllSoldOrnamentsList = (state: RootState) =>
    state.soldOrnaments.allSoldOrnamentsList;
  export const selectSoldOrnamentsMessage = (state: RootState) =>
    state.soldOrnaments.soldOrnamentsMessage;
  export const selectSoldOrnamentsLoading = (state: RootState) =>
    state.soldOrnaments.isSoldOrnamentsLoading;
  export const selectTotalSoldOrnaments = (state: RootState) =>
  state.soldOrnaments.totalSoldOrnaments;
  
  export const { clearSoldOrnamentsMessage } = soldOrnamentsSlice.actions;
  export default soldOrnamentsSlice.reducer;