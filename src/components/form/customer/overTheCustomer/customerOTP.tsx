import { useState } from "react";
import OtpInput from 'react-otp-input';
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerVerifyOtp } from "../../../../store/api/Customer/CustomerOTP";


export default function OverTheCustomerOTP() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { mobileNumber } = useParams<{ mobileNumber?: string }>();
  const [otp, setOtp] = useState('');


  if (!mobileNumber) {
    // Handle the case where mobileNumber is undefined
    // You can redirect the user, show an error message, etc.
    return <div>Error: Mobile number not provided</div>;

  }
  // const handleInputChange = (index: number, value: string) => {
  //   const updatedOtpValues = [...otpValues];
  //   updatedOtpValues[index] = value;
  //   // setOtpValues(updatedOtpValues);
  // };
  

  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true);

      // const otp = otpValues.join("");

      if (mobileNumber === undefined) {
        throw new Error("Mobile number is undefined");
      }

      const response = await getCustomerVerifyOtp(mobileNumber, otp);

      if (response.code == 200) {
        navigate("/Over-The-Customer_home");
      } else {
        console.error(response.message);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // console.error(error.message);
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
              return (<input key={index}
                {...props}

              />)
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
