import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getTodayGoldRange, updateTodayGoldRange } from '../api/Topbar/GoldRateAPI';

export interface TodayGoldRate{
    id: string;
    created_at:string;
    update_at:string;
    gold_rate:string;
    isActive:string;
    
}

  export interface TodayGoldRateState {
    allTodayGoldRateList: TodayGoldRate[];
    totalTodayGoldRate: number;
    isTodayGoldRateLoading: boolean;
    todayGoldRateMessage: string;
    todayGoldRate: string;
  }

  const initialState: TodayGoldRateState = {
    allTodayGoldRateList: [],
    totalTodayGoldRate: 0,
    isTodayGoldRateLoading: false,
    todayGoldRateMessage: '',
    todayGoldRate:'',
  };


  export const getTodayGoldRateListAsync = createAsyncThunk(
    'lockerOrnaments/getAllLockerOrnaments',

    async () => {
        const res: any = await getTodayGoldRange();
        return res.data;
      
      },
  );

  export const updateTodayGoldRateListAsync = createAsyncThunk(
    'lockerOrnaments/getAllLockerOrnaments',

    async (price:string) => {
        const res: any = await updateTodayGoldRange(price);
        return res.data;
      
      },
  );



  const todayGoldRateSlice = createSlice({
    name: 'todayGoldRate',
    initialState,
    reducers: {
      clearTodayGoldRateMessage: state => {
        state.todayGoldRateMessage = '';
      },
      
    },

    extraReducers: builder => {
        builder
          .addCase(getTodayGoldRateListAsync.pending, state => {
            state.isTodayGoldRateLoading = true;
          })
          .addCase(getTodayGoldRateListAsync.fulfilled, (state, action) => {
            state.allTodayGoldRateList = action.payload.data[0];
            state.isTodayGoldRateLoading = false;
            state.todayGoldRate = action.payload.data[0].gold_rate
          })
          .addCase(getTodayGoldRateListAsync.rejected, state => {
            state.isTodayGoldRateLoading = false;
          })

          // .addCase(updateTodayGoldRateListAsync.fulfilled, (state, action) => {
          //   state.allTodayGoldRateList = state.allTodayGoldRateList.map(todayGoldRate =>
          //     todayGoldRate.gold_rate === action.payload.data.gold_rate
          //       ? action.payload.data
          //       : todayGoldRate,
          //   );
          //   state.todayGoldRateMessage = action.payload.message;
          //   state.isTodayGoldRateLoading = false;
          // })
          // .addCase(updateTodayGoldRateListAsync.pending, state => {
          //   state.isTodayGoldRateLoading = true;
          // })
          // .addCase(updateTodayGoldRateListAsync.rejected, (state, action) => {
          //   state.isTodayGoldRateLoading = false;
          //   state.todayGoldRateMessage = action.error.message
          //     ? action.error.message
          //     : 'Something went wrong';
          // })

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

    export const selectAllTodayGoldRateList = (state: RootState) =>
    state.todayGoldRate.todayGoldRate;
  export const selectTodayGoldRateMessage = (state: RootState) =>
    state.todayGoldRate.todayGoldRateMessage;
  export const selectTodayGoldRateLoading = (state: RootState) =>
    state.todayGoldRate.isTodayGoldRateLoading;
  export const selectTotalTodayGoldRate = (state: RootState) =>
  state.todayGoldRate.totalTodayGoldRate;
  
  export const { clearTodayGoldRateMessage } = todayGoldRateSlice.actions;
  export default todayGoldRateSlice.reducer;