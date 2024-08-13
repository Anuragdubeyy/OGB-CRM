import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCustomerOtp } from "../api/Customer/CustomerOTP";

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
}



export const getCustomerOtpAsync = createAsyncThunk(
    "customerOtp/getCustomerOtp",
    async (mobilenumber:string) => {
      const res: any = await getCustomerOtp(mobilenumber);
  
      return res.data;
    }
  );

