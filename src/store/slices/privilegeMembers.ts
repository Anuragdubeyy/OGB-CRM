import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getAllPrivilegeMembers } from '../api/Privilege/PrivilegeMembers';

export interface PrivilegeMembers{
    ornaments_id:string;
    weight:string;
    user_image:string;
    user_name:string;
    user_mobile:string;
    user_email:string;
    privilege_ornaments:string;
    barter_ornament:string;
    barter_weight:string;
    

    

}

// interface Category {
//     name: string;
//     _id: string;
//     isDeleted: boolean;
//     isActive: boolean;
//   }

  export interface PrivilegeMembersState {
    allPrivilegeMembersList: PrivilegeMembers[];
    totalPrivilegeMembers: number;
    isPrivilegeMembersLoading: boolean;
    privilegeMembersMessage: string;
    // customerCategories: CustomerCategory[];

  }

  const initialState: PrivilegeMembersState = {
    allPrivilegeMembersList: [],
    totalPrivilegeMembers: 0,
    isPrivilegeMembersLoading: false,
    privilegeMembersMessage: '',
    // customerCategories:[],
  };


  export const getPrivilegeMembersListAsync = createAsyncThunk(
    'privilegeMembers/getAllPrivilegeMembers',
   
    async () => {
        const res: any = await getAllPrivilegeMembers();
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

  const privilegeMembersSlice = createSlice({
    name: 'privilegeMembers',
    initialState,
    reducers: {
      clearPrivilegeMembersMessage: state => {
        state.privilegeMembersMessage = '';
      },
      
    },

    extraReducers: builder => {
        builder
          .addCase(getPrivilegeMembersListAsync.pending, state => {
            state.isPrivilegeMembersLoading = true;
          })
          .addCase(getPrivilegeMembersListAsync.fulfilled, (state, action) => {
            state.allPrivilegeMembersList = action.payload.data;
            state.isPrivilegeMembersLoading = false;
          })
          .addCase(getPrivilegeMembersListAsync.rejected, state => {
            state.isPrivilegeMembersLoading = false;
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

    export const selectAllPrivilegeMembersList = (state: RootState) =>
    state.privilegeMembers.allPrivilegeMembersList;
  export const selectPrivilegeMembersMessage = (state: RootState) =>
    state.privilegeMembers.privilegeMembersMessage;
  export const selectPrivilegeMembersLoading = (state: RootState) =>
    state.privilegeMembers.isPrivilegeMembersLoading;
  export const selectTotalPrivilegeMembers = (state: RootState) =>
  state.privilegeMembers.totalPrivilegeMembers;
  
  export const { clearPrivilegeMembersMessage } = privilegeMembersSlice.actions;
  export default privilegeMembersSlice.reducer;