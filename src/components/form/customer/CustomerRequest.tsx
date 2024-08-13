import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/Hooks";
import { getCustomerOtp } from "../../../store/api/Customer/CustomerOTP";
import { getCheckUserListAsync, selectCheckUserMessage } from "../../../store/slices/userCheck";

export default function CustomerRequest() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(getCheckUserListAsync(mobileNumber))
  },[dispatch, mobileNumber])

const userExistMessage= useAppSelector(selectCheckUserMessage)
  const handleSendOtp = async () => {

    try {
      setIsLoading(true);
      await getCustomerOtp(mobileNumber);
      // Pass mobileNumber as a route parameter to CustomerOTP
      navigate(`/customer-otp/${mobileNumber}`);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // Handle error
    }
  };

  return (
    <div
      className="p-8 mx-auto max-w-2xl mt-8 bg-white rounded-md"
      style={{
        fontWeight: "500",
        border: "1px solid rgba(195, 166, 109, 0.5)",
        borderRadius: "1.5rem ",
      }}
    >
      <div>
        <h2 className="text-2xl font-semibold mb-2">Customer Request</h2>
        <p className="text-gray-600 mb-4 mt-6">Customer Mobile Number</p>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          type="tel"
          placeholder="9090909090"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <button
          className="w-28 bg-black mt-2 text-white py-2 rounded-md hover:bg-black disabled:opacity-50"
          type="button"
          disabled={isLoading}
          onClick={userExistMessage === "User exists" ? handleSendOtp : () => {}}
          >
          Send OTP
        </button>
      </div>
    </div>
  );
}