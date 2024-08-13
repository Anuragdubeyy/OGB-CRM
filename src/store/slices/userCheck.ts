import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { CheckUser } from '../api/Customer/CheckUser';
// import { deleteCustomer, getAllCustomers } from '../api/customerAPI';
// import { getAllCheckUser } from '../api/CheckUser';

export interface CheckUser{
    _id: string;
    mobilenumber: string;
    emailid:string;
    name:string;
    isPrivileged: string;
    isBarter:string;
    isDeleted:string;
    isActive:string;
    profileImage:string;
    isSiezed:string;
    created_at:string;
    updated_at:string;
    message:string;
}


  export interface CheckUserState {
    allCheckUserList: CheckUser | null;
    totalCheckUser: number;
    isCheckUserLoading: boolean;
    checkUserMessage: string;
    checkUSerId :string;
    checkUserMobile : string;

  }

  const initialState: CheckUserState = {
    allCheckUserList: null,
    totalCheckUser: 0,
    isCheckUserLoading: false,
    checkUserMessage: '',
    checkUSerId: '',
    checkUserMobile: '',
  };


  export const getCheckUserListAsync = createAsyncThunk(
    'CheckUser/getAllCheckUser',
   
    async (mobilenumber:string) => {
        const res: any = await CheckUser(mobilenumber);
        return res.data;
       
      },
  );


  const checkUserSlice = createSlice({
    name: 'checkUser',
    initialState,
    reducers: {
      clearCheckUserMessage: state => {
        state.checkUserMessage = '';
      },
      
    },

    extraReducers: builder => {
        builder
          .addCase(getCheckUserListAsync.pending, state => {
            state.isCheckUserLoading = true;
        })
        .addCase(getCheckUserListAsync.fulfilled, (state, action) => {
            state.allCheckUserList = action.payload.data[0];
            state.isCheckUserLoading = false;

            state.checkUserMessage = action.payload.message
            state.checkUSerId = action.payload.data[0]._id
            state.checkUserMobile = action.payload.data[0].mobilenumber
        })
        .addCase(getCheckUserListAsync.rejected, state => {
            state.isCheckUserLoading = false;
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

    export const selectAllCheckUserList = (state: RootState) =>
    state.checkUser.allCheckUserList;
  export const selectCheckUserMessage = (state: RootState) =>
    state.checkUser.checkUserMessage;
  export const selectCheckUserId = (state: RootState) =>
    state.checkUser.checkUSerId;
    export const selectCheckUserMobile = (state: RootState) =>
    state.checkUser.checkUserMobile;
  export const selectCheckUserLoading = (state: RootState) =>
    state.checkUser.isCheckUserLoading;
  export const selectTotalCheckUser = (state: RootState) =>
  state.checkUser.totalCheckUser;
  
  export const { clearCheckUserMessage } = checkUserSlice.actions;
  export default checkUserSlice.reducer;