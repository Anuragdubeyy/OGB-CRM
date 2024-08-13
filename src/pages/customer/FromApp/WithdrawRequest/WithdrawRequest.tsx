import { NavLink } from "react-router-dom";
import { withdrawRequestColumn } from "./column";
import DataTable from "../../../../components/common/DataTable";
import { useAppDispatch, useAppSelector } from "../../../../store/Hooks";
import { selectAllCheckUserList, selectCheckUserId } from "../../../../store/slices/userCheck";
import { getCustomerWithdrawListAsync, selectAllCustomerWithdrawList } from "../../../../store/slices/customerWithdraw";
import { useEffect } from "react";
import { ImageDomain } from "../../../../constant";

export default function WithdrawRequest () {
  const checkUserId = useAppSelector(selectCheckUserId);
  console.log(checkUserId)
  const customer = useAppSelector(selectAllCheckUserList);
  const CustomerWithdrawList = useAppSelector(selectAllCustomerWithdrawList)
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(getCustomerWithdrawListAsync(checkUserId))
  },[dispatch, checkUserId])

    return (
      <div
        className="border-2 p-3"
        style={{
          fontWeight: "500",
          border: "1px solid rgba(195, 166, 109, 0.5)",
          borderRadius: "1.5rem ",
        }}
      >
        <div className="flex gap-4 ">
        <NavLink to='/customer-request'>
            <img className="w-5" src="./src/assets/icon/backbutton.svg" alt="" />
            </NavLink>          <p className="text-[#C3A66D]">Switch Customer</p>
        </div>
        <div className="flex gap-36 mt-8">
          <div className="flex gap-4  ">
            <img
              className="w-11 h-11 overflow-hidden rounded-full"
            src={ImageDomain + "/" + customer?.profileImage}
              alt=""
            />
            <h2 className="mt-2">{customer?.name}</h2>
          </div>
  
          <div className="flex gap-36 mt-2">
            <h2>Customer Mobile No: {customer?.mobilenumber}</h2>
            <h2>Customer Email: {customer?.emailid}</h2>
          </div>
        </div>
  
        <div className="flex gap-36 justify-center mt-6 active:text-[#C3A66D]">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? " bg-primary-gradient border-b-2 border-[#C3A66D]  text-[#C3A66D] mr-3 "
              : " text-black"
          }
          to="/customer-form-deposit"
        >
          <h2 className=" hover:text-[#C3A66D] cursor-pointer relative   ">
            Deposit Request
          </h2>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? " bg-primary-gradient border-b-2 border-[#C3A66D]  text-[#C3A66D] mr-3 "
              : " text-black"
          }
          to="/withdraw-request"
        >
          <h2 className=" hover:text-[#C3A66D] cursor-pointer relative group">
            Withdraw Request
          </h2>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? " bg-primary-gradient border-b-2 border-[#C3A66D]  text-[#C3A66D] mr-3 "
              : " text-black"
          }
          to="/order"
        >
          <h2 className=" hover:text-[#C3A66D] cursor-pointer relative group">
            Orders
          </h2>
        </NavLink>
      </div>
  
        <div className="border border-input rounded-2xl mt-3 bg-ornament-bg">
    
    <DataTable tableRef={[]} columns={withdrawRequestColumn} data={CustomerWithdrawList}/>
  </div>
  
  
      </div>
    );
  }
  