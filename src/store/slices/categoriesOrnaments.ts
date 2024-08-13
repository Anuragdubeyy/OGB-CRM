import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getCategriesOrnaments } from '../api/Ornaments/CategriesOrnaments';
// import { getAllSoldOrnaments } from '../api/Ornaments/SoldOrnaments';
// import { getAllLockerOrnaments } from '../api/Ornaments/LockerOrnaments';

export interface CategoriesOrnaments{
    id: string;
    created_at: string;
    category: string;
    updeted_at:string;
    total_ornament:string;
    total_weight:string;
    isActive:boolean;
    
    

}

// interface Category {
//     name: string;
//     _id: string;
//     isDeleted: boolean;
//     isActive: boolean;
//   }

  export interface CategoriesOrnamentsState {
    allCategoriesOrnamentsList: CategoriesOrnaments[];
    totalCategoriesOrnaments: number;
    isCategoriesOrnamentsLoading: boolean;
    categoriesOrnamentsMessage: string;
    // customerCategories: CustomerCategory[];

  }

  const initialState: CategoriesOrnamentsState = {
    allCategoriesOrnamentsList: [],
    totalCategoriesOrnaments: 0,
    isCategoriesOrnamentsLoading: false,
    categoriesOrnamentsMessage: '',
    // customerCategories:[],
  };


  export const getCategoriesOrnamentsListAsync = createAsyncThunk(
    'categriesOrnaments/getAllCategriesOrnaments',
   
    async () => {
        const res: any = await getCategriesOrnaments();
        
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

  const categoriesOrnamentsSlice = createSlice({
    name: 'categriesOrnaments',
    initialState,
    reducers: {
      clearCategoriesOrnamentsMessage: state => {
        state.categoriesOrnamentsMessage = '';
      },
      
    },

    extraReducers: builder => {
        builder
          .addCase(getCategoriesOrnamentsListAsync.pending, state => {
            state.isCategoriesOrnamentsLoading = true;
          })
          .addCase(getCategoriesOrnamentsListAsync.fulfilled, (state, action) => {
            state.allCategoriesOrnamentsList = action.payload.data;
            state.isCategoriesOrnamentsLoading = false;
          })
          .addCase(getCategoriesOrnamentsListAsync.rejected, state => {
            state.isCategoriesOrnamentsLoading = false;
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

    export const selectAllCategoriesOrnamentsList = (state: RootState) =>
    state.categoriesOrnaments.allCategoriesOrnamentsList;
  export const selectCategoriesOrnamentsMessage = (state: RootState) =>
    state.categoriesOrnaments.categoriesOrnamentsMessage;
  export const selectCategoriesOrnamentsLoading = (state: RootState) =>
    state.categoriesOrnaments.isCategoriesOrnamentsLoading;
  export const selectTotalCategoriesOrnaments = (state: RootState) =>
  state.categoriesOrnaments.totalCategoriesOrnaments;
  
  export const { clearCategoriesOrnamentsMessage } = categoriesOrnamentsSlice.actions;
  export default categoriesOrnamentsSlice.reducer;