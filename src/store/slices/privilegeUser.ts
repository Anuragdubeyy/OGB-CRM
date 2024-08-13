import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getAllPrivilegeUser } from '../api/Privilege/PrivilegeUser';

export interface PrivilegeUser{
    ornaments_id:string;
    gold_weight:string;
    image:string;
    user_name:string;
    user_mobile:string;
    user_email:string;
    user_id:string;
    privilege_ornaments:string;
    barter_ornaments:string;
    barter_weight:string;
    

    

}

// interface Category {
//     name: string;
//     _id: string;
//     isDeleted: boolean;
//     isActive: boolean;
//   }

  export interface PrivilegeUserState {
    allPrivilegeUserList: PrivilegeUser[];
    totalPrivilegeUser: number;
    isPrivilegeUserLoading: boolean;
    privilegeUserMessage: string;
    // customerCategories: CustomerCategory[];

  }

  const initialState: PrivilegeUserState = {
    allPrivilegeUserList: [],
    totalPrivilegeUser: 0,
    isPrivilegeUserLoading: false,
    privilegeUserMessage: '',
    // customerCategories:[],
  };


  export const getPrivilegeUserListAsync = createAsyncThunk(
    'privilegeUser/getAllPrivilegeUser',
   
    async (user_id:string) => {
        const res: any = await getAllPrivilegeUser(user_id);
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

  const privilegeUserSlice = createSlice({
    name: 'privilegeUser',
    initialState,
    reducers: {
      clearPrivilegeUserMessage: state => {
        state.privilegeUserMessage = '';
      },
      
    },

    extraReducers: builder => {
        builder
          .addCase(getPrivilegeUserListAsync.pending, state => {
            state.isPrivilegeUserLoading = true;
          })
          .addCase(getPrivilegeUserListAsync.fulfilled, (state, action) => {
            state.allPrivilegeUserList = action.payload.data;
            state.isPrivilegeUserLoading = false;
          })
          .addCase(getPrivilegeUserListAsync.rejected, state => {
            state.isPrivilegeUserLoading = false;
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

    export const selectAllPrivilegeUserList = (state: RootState) =>
    state.privilegeUser.allPrivilegeUserList;
  export const selectPrivilegeUserMessage = (state: RootState) =>
    state.privilegeUser.privilegeUserMessage;
  export const selectPrivilegeUserLoading = (state: RootState) =>
    state.privilegeUser.isPrivilegeUserLoading;
  export const selectTotalPrivilegeUser = (state: RootState) =>
  state.privilegeUser.totalPrivilegeUser;
  
  export const { clearPrivilegeUserMessage } = privilegeUserSlice.actions;
  export default privilegeUserSlice.reducer;