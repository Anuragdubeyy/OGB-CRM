import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateResetAdminPassword } from "../../routes/schema/resetPassword";
import { resetAdminPassword } from "../api/settings/adminResetPass";

export const resetAdminPasswordAsync = createAsyncThunk(
    "Admin/Admin",
   async ({admin_id, password}:CreateResetAdminPassword) => {
    const res: any = await resetAdminPassword({admin_id, password});
    console.log(res.data)
    return res.data;
   }
  );


