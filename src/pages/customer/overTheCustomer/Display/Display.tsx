import { NavLink } from "react-router-dom";
import { displayColumn } from "./column";
import DataTable from "../../../../components/common/DataTable";
import { ImageDomain } from "../../../../constant";
import {
  selectAllCheckUserList,
  selectCheckUserId,
} from "../../../../store/slices/userCheck";
import { useAppDispatch, useAppSelector } from "../../../../store/Hooks";
import { useEffect } from "react";
import {
  getCustomerOtcDisplaysAsync,
  selectAllCustomerOtcDisplayList,
} from "../../../../store/slices/customerOtcDisplay";

export default function DisplayCustomer() {
  const customer = useAppSelector(selectAllCheckUserList);
  const checkUserId = useAppSelector(selectCheckUserId);
  const CustomerOtcList = useAppSelector(selectAllCustomerOtcDisplayList);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCustomerOtcDisplaysAsync(checkUserId));
  }, [dispatch, checkUserId]);
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
        <NavLink to="/OverTheCustomer-request">
          <img className="w-5" src="./src/assets/icon/backbutton.svg" alt="" />
        </NavLink>
        <p className="text-[#C3A66D]">Switch Customer</p>
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

      <div className="flex gap-20 justify-center mt-6 active:text-[#C3A66D]">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? " bg-primary-gradient border-b-2 border-[#C3A66D] text-[#C3A66D] mr-3 "
              : " text-black"
          }
          to="/Over-The-Customer_home"
        >
          <h2 className=" hover:text-[#C3A66D] cursor-pointer relative group active   ">
            Home
          </h2>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? " bg-primary-gradient border-b-2 border-[#C3A66D] text-[#C3A66D] mr-3 "
              : " text-black"
          }
          to="/customer-deposit"
        >
          <h2 className=" hover:text-[#C3A66D] cursor-pointer relative group">
            Deposit
          </h2>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? " bg-primary-gradient border-b-2 border-[#C3A66D] text-[#C3A66D] mr-3 "
              : " text-black"
          }
          to="/customer-withdraw"
        >
          <h2 className=" hover:text-[#C3A66D] cursor-pointer relative group">
            withdraw
          </h2>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? " bg-primary-gradient border-b-2 border-[#C3A66D] text-[#C3A66D] mr-3 "
              : " text-black"
          }
          to="/barter-customer"
        >
          <h2 className=" hover:text-[#C3A66D] cursor-pointer relative group">
            Barter
          </h2>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? " bg-primary-gradient border-b-2 border-[#C3A66D] text-[#C3A66D] mr-3 "
              : " text-black"
          }
          to="/display-customer"
        >
          <h2 className=" hover:text-[#C3A66D] cursor-pointer relative group">
            Display
          </h2>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? " bg-primary-gradient border-b-2 border-[#C3A66D] text-[#C3A66D] mr-3 "
              : " text-black"
          }
          to="/customer-immediate-sell"
        >
          <h2 className=" hover:text-[#C3A66D] cursor-pointer relative group">
            Immediate Sell
          </h2>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? " bg-primary-gradient border-b-2 border-[#C3A66D] text-[#C3A66D] mr-3 "
              : " text-black"
          }
          to="/barter-list"
        >
          <h2 className=" hover:text-[#C3A66D] cursor-pointer relative group">
            Barter List
          </h2>
        </NavLink>
      </div>

      <div className="border border-input rounded-2xl mt-3 bg-ornament-bg">
        <DataTable
          tableRef={[]}
          columns={displayColumn}
          data={CustomerOtcList}
        />
      </div>
    </div>
  );
}
