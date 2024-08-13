import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { UpdatePrivilegeSettleLoanInput } from '../../routes/schema/AddPrivilegeSettleLoan';
import { getAllPrivilegeLoans, updatePrivilegeSettleLoan } from '../api/Privilege/PrivilegeLoans';

export interface PrivilegeLoans{
    loan_id:string;
    user_id:string;
    user_name:string;
    user_image:string;
    user_mobile:string;
    loan_amount:string;
    validity:string;
    reason:string;
    upi_id:string;
    status:string;
    day_left:string;
    settled_amount: string;
    settlements: Settlements;
}

interface Settlements {
    date:string;
    transaction_id:string;
    amount:string;
    
  }

  export interface PrivilegeLoansState {
    allPrivilegeLoansList: PrivilegeLoans[];
    totalPrivilegeLoans: number;
    isPrivilegeLoansLoading: boolean;
    privilegeLoansMessage: string;
    allSettlementList: Settlements[];

  }

  const initialState: PrivilegeLoansState = {
    allPrivilegeLoansList: [],
    totalPrivilegeLoans: 0,
    isPrivilegeLoansLoading: false,
    privilegeLoansMessage: '',
    allSettlementList: [],
  };


  export const getPrivilegeLoansListAsync = createAsyncThunk(
    'PrivilegeLoans/getAllPrivilegeLoans',
   
    async () => {
        const res: any = await getAllPrivilegeLoans();
        return res.data;
       
      },
  );

  export const updatePrivilegeSettleLoanAsync = createAsyncThunk(
    'privilege/updatePrivilegeSettelLoan',
    async ({user_id, loan_id, settlement_amount}:UpdatePrivilegeSettleLoanInput) => {
      const res: any = await updatePrivilegeSettleLoan({user_id, loan_id, settlement_amount});
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

  const privilegeLoansSlice = createSlice({
    name: 'privilegeLoans',
    initialState,
    reducers: {
      clearPrivilegeLoansMessage: state => {
        state.privilegeLoansMessage = '';
      },
      
    },

    extraReducers: builder => {
        builder
          .addCase(getPrivilegeLoansListAsync.pending, state => {
            state.isPrivilegeLoansLoading = true;
          })
          .addCase(getPrivilegeLoansListAsync.fulfilled, (state, action) => {
            state.allPrivilegeLoansList = action.payload.data;
            state.isPrivilegeLoansLoading = false;
            state.allSettlementList = action.payload.data[0].settlements

          })
          .addCase(getPrivilegeLoansListAsync.rejected, state => {
            state.isPrivilegeLoansLoading = false;
          })
          
          .addCase(updatePrivilegeSettleLoanAsync.fulfilled, (state, action) => {
            state.allPrivilegeLoansList = state.allPrivilegeLoansList.map(privilegeLoans =>
                privilegeLoans.user_id === action.payload.data.user_id
                ? action.payload.data
                : privilegeLoans,
            );
            state.privilegeLoansMessage = action.payload.message;
            state.isPrivilegeLoansLoading = false;
          })
          .addCase(updatePrivilegeSettleLoanAsync.pending, state => {
            state.isPrivilegeLoansLoading = true;
          })
          .addCase(updatePrivilegeSettleLoanAsync.rejected, (state, action) => {
            state.isPrivilegeLoansLoading = false;
            state.privilegeLoansMessage = action.error.message
              ? action.error.message
              : 'Something went wrong';
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

    export const selectAllPrivilegeLoansList = (state: RootState) =>
    state.privilegeLoans.allPrivilegeLoansList;
    export const selectAllSettlementList = (state: RootState) =>
    state.privilegeLoans.allSettlementList;
  export const selectPrivilegeLoansMessage = (state: RootState) =>
    state.privilegeLoans.privilegeLoansMessage;
  export const selectPrivilegeLoansLoading = (state: RootState) =>
    state.privilegeLoans.isPrivilegeLoansLoading;
  export const selectTotalPrivilegeLoans = (state: RootState) =>
  state.privilegeLoans.totalPrivilegeLoans;
  
  export const { clearPrivilegeLoansMessage } = privilegeLoansSlice.actions;
  export default privilegeLoansSlice.reducer;