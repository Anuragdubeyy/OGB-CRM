import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { addAdmin } from "../api/Registered/addAdmin";

export interface AddAdmin{
    id:string;
    name:string;
    email:string;
    mobile:string;
    isActive:string;
    isDelete:string;
    image:string;
    role:string;
    userType:string;
    created_at:string;
    updated_at:string;
}

export interface AddAdminState {
  allAddAdminList: AddAdmin[];
  totalAddAdmin:number;
  isAddAdminLoading: boolean;
  addAdminMessage: string;
  
}

const initialState: AddAdminState = {
  allAddAdminList: [],
  totalAddAdmin: 0,
  isAddAdminLoading: false,
  addAdminMessage: '',
};


export const addAdminAsync = createAsyncThunk(
    "addAdmin/addAdmin",
   async (formData:FormData) => {
    const res: any = await addAdmin(formData);
    console.log(res.data)
    return res.data;
   }
  );


  const addAdminSlice = createSlice({
    name: 'addAdmin',
    initialState,
    reducers: {
        clearAddAdminMessage : state => {
            state.addAdminMessage = '';
          },
    },

    extraReducers: builder => {
        builder
        

        .addCase(addAdminAsync.fulfilled, (state, action) => {
          state.allAddAdminList = state.allAddAdminList.map(addAdmin =>
              addAdmin.name === action.payload.data.name
              ? action.payload.data
              : addAdmin,
          );
          state.addAdminMessage = action.payload.message;
          state.isAddAdminLoading = false;
        })
        .addCase(addAdminAsync.pending, state => {
          state.isAddAdminLoading = true;
        })
        .addCase(addAdminAsync.rejected, (state, action) => {
          state.isAddAdminLoading = false;
          state.addAdminMessage = action.error.message
            ? action.error.message
            : 'Something went wrong';
        })

    },
  })

  export const selectAllAddAdminList = (state: RootState) =>
  state.addAdmin.allAddAdminList;
  export const selectAddAdminMessage = (state: RootState) =>
    state.addAdmin.addAdminMessage;
  export const selectAddAdminLoading = (state: RootState) =>
    state.addAdmin.isAddAdminLoading;
  export const selectTotalPremiumCollection = (state: RootState) =>
  state.addAdmin.totalAddAdmin;

export const { clearAddAdminMessage} = addAdminSlice.actions;
export default addAdminSlice.reducer;