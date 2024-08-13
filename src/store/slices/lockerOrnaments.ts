import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getAllLockerOrnaments } from '../api/Ornaments/LockerOrnaments';

export interface LockerOrnaments{
    ornament_id: string;
    ornament_name: string;
    category: string;
    gold_weight:string;
    total_price:string;
    carat:string;
    height:string;
    width:string;
    other_stone:string;
    other_metal:string;
    other_charge:string;
    locker_number:string;
    image:string;
    user_name:string;
    user_mobile:string;
    withdraw_date:Date;
    

}

// interface Category {
//     name: string;
//     _id: string;
//     isDeleted: boolean;
//     isActive: boolean;
//   }

  export interface LockerOrnamentsState {
    allLockerOrnamentsList: LockerOrnaments[];
    totalLockerOrnaments: number;
    isLockerOrnamentsLoading: boolean;
    lockerOrnamentsMessage: string;
    // customerCategories: CustomerCategory[];

  }

  const initialState: LockerOrnamentsState = {
    allLockerOrnamentsList: [],
    totalLockerOrnaments: 0,
    isLockerOrnamentsLoading: false,
    lockerOrnamentsMessage: '',
    // customerCategories:[],
  };


  export const getLockerOrnamentsListAsync = createAsyncThunk(
    'lockerOrnaments/getAllLockerOrnaments',
   
    async () => {
        const res: any = await getAllLockerOrnaments();
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

  const lockerOrnamentsSlice = createSlice({
    name: 'lockerOrnaments',
    initialState,
    reducers: {
      clearLockerOrnamentsMessage: state => {
        state.lockerOrnamentsMessage = '';
      },
      
    },

    extraReducers: builder => {
        builder
          .addCase(getLockerOrnamentsListAsync.pending, state => {
            state.isLockerOrnamentsLoading = true;
          })
          .addCase(getLockerOrnamentsListAsync.fulfilled, (state, action) => {
            state.allLockerOrnamentsList = action.payload.data;
            state.isLockerOrnamentsLoading = false;
          })
          .addCase(getLockerOrnamentsListAsync.rejected, state => {
            state.isLockerOrnamentsLoading = false;
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

    export const selectAllLockerOrnamentsList = (state: RootState) =>
    state.lockerOrnaments.allLockerOrnamentsList;
  export const selectLockerOrnamentsMessage = (state: RootState) =>
    state.lockerOrnaments.lockerOrnamentsMessage;
  export const selectLockerOrnamentsLoading = (state: RootState) =>
    state.lockerOrnaments.isLockerOrnamentsLoading;
  export const selectTotalLockerOrnaments = (state: RootState) =>
  state.lockerOrnaments.totalLockerOrnaments;
  
  export const { clearLockerOrnamentsMessage } = lockerOrnamentsSlice.actions;
  export default lockerOrnamentsSlice.reducer;