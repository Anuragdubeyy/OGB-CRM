import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function LeftSideBar({sideButton,setSideButton}:any) {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [activeChild, setActiveChild] = useState<number | null>(null);

  const handleDropdownClick = (index: number) => {
    if (activeDropdown === index) {
      setActiveChild((prevChild) => (prevChild === null ? index : null));
      console.log(activeChild);
    } else {
      setActiveDropdown(index);
      setActiveChild(null);
    }
  };

  return (

    
    <nav
      className={`${
        sideButton ? " " : " hidden "
      }w-56  mb-10  z-50 fixed min-w-fit bg-white `}

      style={{
        fontWeight: "500",
        border: "1px solid rgba(195, 166, 109, 1)",
        // marginBottom: "1rem",
        borderRadius: "0rem 1.5rem 0rem 0rem",
      }}
    >
      <div className=" ml-3 mt-5 flex flex-col gap-6 max-h-screen  ">
        <div className="flex justify-between mr-3">
          <img src="./src/assets/ogb-logo.svg" alt="" />

        
            <button onClick={() => setSideButton(false)}>
              <img className="w-6" src="./src/assets/icon/option.svg" alt="" />
            </button>
    
        </div>
        <div className="overflow-auto h-screen flex flex-col gap-5 mb-10">

        <div
          className={`flex flex-col cursor-pointer ${
            activeDropdown === 0
              ? "bg-gradient-to-r from-gray-800  via-slate-600 to-gray-800 text-base mr-3 p-2 rounded-xl"
              : "bg-white"
          } text-${activeDropdown === 0 ? "white" : "black"}`}
          onClick={() => handleDropdownClick(0)}
        >
          <div className="flex gap-3">
            <img
              className={`${
                activeDropdown === 0 ? "filter invert" : "fill-inherit"
              }`}
              src="./src/assets/icon/deshboard.svg"
              alt=""
            />
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? " bg-primary-gradient text-[#C3A66D] mr-3 rounded"
                  : " text-black"
              }
              to="/dashboard"
            >
              <p>Dashboard</p>
            </NavLink>
          </div>
        </div>

        <div
          className={`flex flex-col cursor-pointer ${
            activeDropdown === 1
              ? "bg-gradient-to-r from-gray-800  via-slate-600 to-gray-800 text-base mr-3 p-2 rounded-xl"
              : "bg-white"
          } text-${activeDropdown === 1 ? "white" : "black"}`}
          onClick={() => handleDropdownClick(1)}
        >
          <NavLink
            className={`${
              activeDropdown === 1
                ? "bg-primary-gradient mr-3 rounded"
                : "bg-white text-black"
            }`}
            to="/barter-available"
          >
            <div className="flex gap-3 ">
              <img
                className={`${
                  activeDropdown === 1 ? "filter invert" : "fill-inherit"
                }`}
                src="./src/assets/icon/barter.svg"
                alt=""
              />
              <p>Barter</p>
            </div>
            {activeDropdown === 1 && (
              <div className="ml-5 text-sm mt-2 flex flex-col gap-2 ">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-white"
                  }
                  to="/barter-available"
                >
                  <li> Barter Available</li>
                </NavLink>

                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-white"
                  }
                  to="/barter-given"
                >
                  <li> Barter Given</li>
                </NavLink>

                <NavLink
                  to="/barter-history"
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-white"
                  }
                >
                  <li> Barter History</li>
                </NavLink>
              </div>
            )}{" "}
          </NavLink>
        </div>

        {/* customer Request start*/}

        <div
          className={`flex flex-col cursor-pointer ${
            activeDropdown === 2
              ? "bg-gradient-to-r from-gray-800  via-slate-600 to-gray-800 text-base mr-3 p-2 rounded-xl"
              : "bg-white"
          } text-${activeDropdown === 2 ? "white" : "black"}`}
          onClick={() => handleDropdownClick(2)}
        >
          <NavLink
            className={`${
              activeDropdown === 2
                ? "bg-primary-gradient mr-3 rounded"
                : "bg-white text-black"
            }`}
            to="/customer-request"
          >
            <div className="flex   gap-3">
              <img
                className={`${
                  activeDropdown === 2 ? "filter invert" : "fill-inherit"
                }`}
                src="./src/assets/icon/customer.svg"
                alt=""
              />
              <p className=" mt-1 ">Customer Request </p>
            </div>
            {activeDropdown === 2 && (
              <div className="ml-5 text-[0.8rem]   flex flex-col gap-2 ">
                <NavLink
                  to="/customer-request"
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-white"
                  }
                >
                  <li>From App</li>
                </NavLink>

                <NavLink
                  to="/OverTheCustomer-request"
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-white"
                  }
                >
                  <li> Over The Customer</li>
                </NavLink>
              </div>
            )}
          </NavLink>
        </div>

        {/* Ornaments start */}

        <div
          className={`flex flex-col cursor-pointer ${
            activeDropdown === 3
              ? "bg-gradient-to-r from-gray-800  via-slate-600 to-gray-800  text-base rounded-xl p-2"
              : "bg-white"
          } text-${activeDropdown === 3 ? "white" : "black"}`}
          onClick={() => handleDropdownClick(3)}
        >
          <NavLink
            className={`${
              activeDropdown === 3
                ? "bg-primary-gradient mr-3 rounded"
                : "bg-white text-black"
            }`}
            to="/deposit-ornaments"
          >
            <div className="flex gap-3">
              <img
                className={`${
                  activeDropdown === 3 ? "filter invert" : "fill-inherit"
                }`}
                src="./src/assets/icon/ornaments.svg"
                alt=""
              />
              <p>Ornaments</p>
            </div>
            {activeDropdown === 3 && (
              <div className="ml-5 text-[0.8rem] mt-2 flex flex-col gap-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-white"
                  }
                  to="/deposit-ornaments"
                >
                  <li>Deposited Ornaments</li>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-white"
                  }
                  to="/display-ornaments"
                >
                  <li>Display Ornaments</li>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-white"
                  }
                  to="/sold-ornaments"
                >
                  <li>Sold Ornaments</li>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-white"
                  }
                  to="/withdraw-ornaments"
                >
                  <li>Withdraw Ornaments</li>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-white"
                  }
                  to="/category-ornaments"
                >
                  <li>Ornament Categories </li>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-white"
                  }
                  to="/locker-ornaments"
                >
                  <li>Locker Ornaments</li>
                </NavLink>
                {/* <NavLink className={({ isActive }) =>
                    isActive 
                      ? "text-[#C3A66D]"
                      : "text-white"
                  } to='/barter-ornaments'><li>Barter Ornaments</li></NavLink> */}
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-white"
                  }
                  to="/exchange-ornaments"
                >
                  <li>Exchanged Ornaments</li>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-white"
                  }
                  to="/surrender-ornaments"
                >
                  <li>Surrendered Ornaments</li>
                </NavLink>
              </div>
            )}
          </NavLink>
        </div>

        {/* Order Start */}

        <div
          className={`flex flex-col cursor-pointer ${
            activeDropdown === 4
              ? "bg-gradient-to-r from-gray-800  via-slate-600 to-gray-800 text-base mr-3 p-2 rounded-xl"
              : "bg-white"
          } text-${activeDropdown === 4 ? "white" : "black"}`}
          onClick={() => handleDropdownClick(4)}
        >
          <NavLink
            className={`${
              activeDropdown === 4
                ? "bg-primary-gradient mr-3 rounded"
                : "bg-white text-black"
            }`}
            to="/by-orders"
          >
            <div className="flex gap-3">
              <img
                className={`${
                  activeDropdown === 4 ? "filter invert" : "fill-inherit"
                }`}
                src="./src/assets/icon/order.svg"
                alt=""
              />
              <p>Orders</p>
            </div>
            {activeDropdown === 4 && (
              <div className="ml-5 text-[0.8rem]  mt-2 flex flex-col gap-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-black"
                  }
                  to="/by-orders"
                >
                  <li>Buy Orders</li>
                </NavLink>
              </div>
            )}
          </NavLink>
        </div>

        {/* Privilege Start */}

        <div
          className={`flex flex-col cursor-pointer ${
            activeDropdown === 5
              ? "bg-gradient-to-r from-gray-800  via-slate-600 to-gray-800 text-base mr-3 p-2 rounded-xl"
              : "bg-white"
          } text-${activeDropdown === 5 ? "white" : "black"}`}
          onClick={() => handleDropdownClick(5)}
        >
          {" "}
          <NavLink
            className={`${
              activeDropdown === 5
                ? "bg-primary-gradient mr-3 rounded"
                : "bg-white text-black"
            }`}
            to="/privilege-members"
          >
            <div className="flex gap-3">
              <img
                className={`${
                  activeDropdown === 5 ? "filter invert" : "fill-inherit"
                }`}
                src="./src/assets/icon/privilege.svg"
                alt=""
              />
              <p>Privilege </p>
            </div>
            {activeDropdown === 5 && (
              <div className="ml-5 text-[0.8rem]  mt-2 flex flex-col gap-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-white"
                  }
                  to="/privilege-members"
                >
                  <li>Privilege Members</li>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-white"
                  }
                  to="/Privilege-Loans"
                >
                  <li>Loans</li>
                </NavLink>
              </div>
            )}
          </NavLink>
        </div>

        {/* Premium Collection */}

        <div
          className={`flex flex-col cursor-pointer ${
            activeDropdown === 6
              ? "bg-gradient-to-r from-gray-800  via-slate-600 to-gray-800 text-base mr-2 p-2 rounded-xl"
              : "bg-white"
          } text-${activeDropdown === 6 ? "white" : "black"}`}
          onClick={() => handleDropdownClick(6)}
        >
          <NavLink
            className={`${
              activeDropdown === 6
                ? "bg-primary-gradient mr-3 rounded"
                : "bg-white text-black"
            }`}
            to="/premium-collection-add"
          >
            <div className="flex gap-2">
              <img
                className={`${
                  activeDropdown === 6 ? "filter invert" : "fill-inherit"
                }`}
                src="./src/assets/icon/premium.svg"
                alt=""
              />
              <p>Premium Collection</p>
            </div>
            {activeDropdown === 6 && (
              <div className="ml-5 text-[0.8rem]  flex flex-col gap-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-white"
                  }
                  to="/premium-collection-add"
                >
                  <li>Add premium collection</li>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-white"
                  }
                  to="/premium-list"
                >
                  <li>Premium collection list</li>
                </NavLink>
              </div>
            )}
          </NavLink>
        </div>

        {/* Registered users */}

        <div
          className={`flex flex-col cursor-pointer ${
            activeDropdown === 7
              ? "bg-gradient-to-r from-gray-800  via-slate-600 to-gray-800 text-base mr-3 p-2 rounded-xl"
              : "bg-white"
          } text-${activeDropdown === 7 ? "white" : "black"}`}
          onClick={() => handleDropdownClick(7)}
        >
          <NavLink
            className={`${
              activeDropdown === 7
                ? "bg-primary-gradient mr-3 rounded"
                : "bg-white text-black"
            }`}
            to="/add-admin"
          >
            <div className="flex gap-3">
              <img
                className={`${
                  activeDropdown === 7 ? "filter invert" : "fill-inherit"
                }`}
                src="./src/assets/icon/register.svg"
                alt=""
              />
              <p>Registered Users </p>
            </div>
            {activeDropdown === 7 && (
              <div className="ml-5 text-[0.8rem]  mt-2 flex flex-col gap-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-white"
                  }
                  to="/add-admin"
                >
                  <li>Add admin</li>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-white"
                  }
                  to="/agent-Detail"
                >
                  <li>Agents</li>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-white"
                  }
                  to="/customer-Detail"
                >
                  <li>Customers</li>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#C3A66D]" : "text-white"
                  }
                  to="/manager-Detail"
                >
                  <li>Locker Manager</li>
                </NavLink>
              </div>
            )}
          </NavLink>
        </div>
        <div
          className={`flex flex-col cursor-pointer  ${
            activeDropdown === 8
              ? "bg-gradient-to-r from-gray-800  via-slate-600 to-gray-800 text-base mr-3 p-2 rounded-xl"
              : "bg-white"
          } text-${activeDropdown === 8 ? "white" : "black"}`}
          onClick={() => handleDropdownClick(8)}
        >
          <div className="flex gap-3 ">
            <img
              className={`${
                activeDropdown === 8 ? "filter invert" : "fill-inherit"
              }`}
              src="./src/assets/icon/setting.svg"
              alt=""
            />
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? " bg-primary-gradient text-[#C3A66D] mr-3 rounded"
                  : " text-black"
              }
              to="/setting"
            >
              <p>Setting</p>
            </NavLink>
          </div>
        </div>
        </div>
      </div>
    </nav>

  );
}
