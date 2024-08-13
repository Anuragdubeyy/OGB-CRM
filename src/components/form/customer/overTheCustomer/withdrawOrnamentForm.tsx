import { useState } from "react";
import OtpInput from "react-otp-input";
import { useAppDispatch, useAppSelector } from "../../../../store/Hooks";
import { getCustomerVerifyOtp } from "../../../../store/api/Customer/CustomerOTP";
import { getCustomerOtcWithdrawRequestListAsync } from "../../../../store/slices/CustomerOtcWithdraw";
import {
  selectCheckUserId,
  selectCheckUserMobile,
} from "../../../../store/slices/userCheck";
import { toast,  ToastContainer } from "react-toastify";

interface Props {
  ornament_id: any; // Define prop type
}

export default function WithdrawOrnamentsForm({ ornament_id }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const checkUserMobile = useAppSelector(selectCheckUserMobile);
  const checkUserId = useAppSelector(selectCheckUserId); // Fetch user id once
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState("");

  if (!checkUserMobile) {
    return <div>Error: Mobile number not provided</div>;
  }

  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true);

      if (checkUserMobile === undefined) {
        throw new Error("Mobile number is undefined");
      }

      const response = await getCustomerVerifyOtp(checkUserMobile, otp);

      if (response.code === 200) {
        dispatch(getCustomerOtcWithdrawRequestListAsync({ user_id: checkUserId, ornament_id }));
        toast.success("Ornament Withdraw successful!");

      } else {
        console.error(response.message);
        toast.error(response.message);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="p-8 mx-auto max-w-2xl bg-white shadow-md rounded-md"
      style={{
        fontWeight: "500",
        border: "1px solid rgba(195, 166, 109, 0.5)",
        borderRadius: "1.5rem ",
      }}
    >
            <ToastContainer />

      <div>
        <h2 className="text-2xl font-semibold mb-2">Customer Request</h2>
        <p className="text-black mb-4 mt-6">Please Enter OTP</p>
        <p className="text-gray-600 mb-4 ">
          We have sent a one-time password to your mobile number.
        </p>
        <div className="flex gap-2">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span>-</span>}
            containerStyle="flex gap-2"
            inputStyle="!w-16 h-16  border text-lg border-gray-300 rounded-md text-center"
            renderInput={(props, index) => {
              return <input key={index} {...props} />;
            }}
          />
        </div>
        <button
          className="w-28 bg-black mt-5 text-white py-2 rounded-md hover:bg-black"
          type="submit"
          disabled={isLoading}
          onClick={handleVerifyOtp}
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}
