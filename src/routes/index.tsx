import { Navigate, Route, Routes } from "react-router-dom";
import CustomerOTP from "../components/form/customer/CustomerOTP";
import CustomerRequest from "../components/form/customer/CustomerRequest";
import Dashboard from "../pages/Dashboard/Overview";
import BarterOrnaments from "../pages/Ornaments/BarterOrnaments/BarterOrnament";
import CategoriesOrnaments from "../pages/Ornaments/CategoriesOrnaments/CategoriesOrnament";
import DepositOrnaments from "../pages/Ornaments/DepositeOrnaments/DepositeOrnament";
import DisplayOrnaments from "../pages/Ornaments/DisplayOrnaments/DisplayOrnaments";
import ExchangeOrnaments from "../pages/Ornaments/ExchangeOrnaments/ExchangeOrnament";
import LockerOrnaments from "../pages/Ornaments/LockerOrnaments/LockerOrnaments";
import SoldOrnaments from "../pages/Ornaments/SoldOrnaments/SoldOrnaments";
import SurrenderOrnaments from "../pages/Ornaments/SurrenderOrnaments/SurrenderOrnament";
import WithdrowOrnaments from "../pages/Ornaments/WithdrowOrnaments/WithdrowOrnament";
import BarterAvailable from "../pages/barter/BarterAvailable/BarterAvailable";
import BarterHistory from "../pages/barter/BarterHistory/BarterHistory";
import BarterGiven from "../pages/barter/barterGiven/BarterGiven";
import FromApp from "../pages/customer/FromApp/DepositRequest/FromApp";
import Orders from "../pages/customer/FromApp/Orders/Orders";
import WithdrawRequest from "../pages/customer/FromApp/WithdrawRequest/WithdrawRequest";
import BarterCustomer from "../pages/customer/overTheCustomer/Barter/Barter";
import BarterListCustomer from "../pages/customer/overTheCustomer/BarterList/BarterList";
import Deposit from "../pages/customer/overTheCustomer/Deposit";
import DisplayCustomer from "../pages/customer/overTheCustomer/Display/Display";
import Withdraw from "../pages/customer/overTheCustomer/Withdraw/Withdraw";
import OverTheCustomer from "../pages/customer/overTheCustomer/home/OverTheCustomer";
import ImmediateSellCustomer from "../pages/customer/overTheCustomer/immediate/imeadiate";
import { setApiMessage } from "../store/slices/apiMessage";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/Hooks";
import { toast } from "../components/ui/use-toast";
import loadable from "@loadable/component";
import AddAgentsForm from "../components/form/AddAgentsForm";
import AddManagerForm from "../components/form/AddManagerForm";
import ByOrders from "../pages/Order/ByOrder";
import AddPremiumCollection from "../pages/PremiumCollection/AddPremiumCollection/AddPremium";
import PremiumCollectionList from "../pages/PremiumCollection/AddPremiumCollection/PremiumCollectionList/PremiumCollectionList";
import PrivilegeLoans from "../pages/Privilege/PrivilegeLoans/PrivilegeLoans";
import PrivilegeMembers from "../pages/Privilege/PrivilegeMembers/PrivilegeMember";
import AddAdmin from "../pages/RegisteredUser/AddAdmin/AddAdmin";
import AgentDetails from "../pages/RegisteredUser/Agents/AgentsList";
import CustomerDetails from "../pages/RegisteredUser/Customers/Customers";
import LockerManagerDetails from "../pages/RegisteredUser/LockerManager/LockerManagerList";
import OverTheCustomerRequest from "../components/form/customer/overTheCustomer/customerRequest";
import OverTheCustomerOTP from "../components/form/customer/overTheCustomer/customerOTP";
import Settings from "../pages/Settings/Settings";
import DepositDashboard from "../pages/Dashboard/Deposit";
import WithdrawDashboard from "../pages/Dashboard/Withdraw";
import BarterDashboard from "../pages/Dashboard/Barter";
import DisplayDashboard from "../pages/Dashboard/display";
import SoldDashboard from "../pages/Dashboard/sold";
import ImmediateDashboard from "../pages/Dashboard/immediateSell";

const App = loadable(() => import("../container/App"));
const LoginPage = loadable(() => import("../pages/LoginPage"));

// Returns boolean based on value received
const AdminLoggedIn = () => !!localStorage.getItem("ogbToken");
console.log(AdminLoggedIn());

const ProtectedRoute = ({
  children,
  check,
  to = "/",
}: {
  children: JSX.Element;
  check?: boolean;
  to?: string;
}) => {
  if (check) return children;
  return <Navigate to={to} />;
};

const AppRoutes = () => {
  const dispatch = useAppDispatch();
  // const productMessage = useAppSelector(selectProductMessage);
  const apiMessage = useAppSelector((state) => state.apiMessage);
  const accessToken = useAppSelector((state) => state.authState.accessToken);

  useEffect(() => {}, [accessToken]);

  useEffect(() => {
    if (apiMessage.message) {
      toast({
        variant: apiMessage.type === "Error" ? "destructive" : "default",
        title: apiMessage.type,
        description: apiMessage.message,
      });
    }

    setTimeout(() => {
      dispatch(
        setApiMessage({
          message: "",
          type: "",
        })
      );
    }, 5000);
  }, [dispatch, apiMessage]);

  return (
    <Routes>
      <Route index element={<Navigate to="login" replace />} />
      <Route
        path="login"
        element={
          <ProtectedRoute check={!AdminLoggedIn()} to="/dashboard">
            <LoginPage />
          </ProtectedRoute>
        }
      />
      <Route
        element={
          <ProtectedRoute check={AdminLoggedIn()}>
            <App />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deposit" element={<DepositDashboard/>}/>
        <Route path="/withdraw" element={<WithdrawDashboard/>}/>

        <Route path="/barter" element={<BarterDashboard/>}/>

        <Route path="/display" element={<DisplayDashboard/>}/>
        <Route path="/sold" element={<SoldDashboard/>}/>
        <Route path="/immediate-sell" element={<ImmediateDashboard/>}/>


        {/* barter */}
        <Route path="/barter-available" element={<BarterAvailable />} />
        <Route path="/barter-given" element={<BarterGiven />} />
        <Route path="/barter-history" element={<BarterHistory />} />

        {/* Customer-Request */}
        <Route path="/customer-request" element={<CustomerRequest />} />
        <Route path="/customer-otp/:mobileNumber" element={<CustomerOTP />} />
        <Route path="/customer-form-deposit" element={<FromApp />} />
        <Route path="/withdraw-request" element={<WithdrawRequest />} />
        <Route path="/order" element={<Orders />} />
        <Route
          path="/OverTheCustomer-request"
          element={<OverTheCustomerRequest />}
        />
        <Route
          path="/OverTheCustomer-otp/:mobileNumber"
          element={<OverTheCustomerOTP />}
        />
        <Route path="/Over-The-Customer_home" element={<OverTheCustomer />} />
        <Route path="/customer-deposit" element={<Deposit />} />
        <Route path="/customer-withdraw" element={<Withdraw />} />
        <Route path="/barter-customer" element={<BarterCustomer />} />
        <Route path="/display-customer" element={<DisplayCustomer />} />
        <Route path="/customer-immediate-sell" element={<ImmediateSellCustomer />} />
        <Route path="/barter-list" element={<BarterListCustomer />} />

        {/* Ornaments  */}
        <Route path="/deposit-ornaments" element={<DepositOrnaments />} />
        <Route path="/display-ornaments" element={<DisplayOrnaments />} />
        <Route path="/sold-ornaments" element={<SoldOrnaments />} />
        <Route path="/withdraw-ornaments" element={<WithdrowOrnaments />} />
        <Route path="/category-ornaments" element={<CategoriesOrnaments />} />
        <Route path="/locker-ornaments" element={<LockerOrnaments />} />
        <Route path="/barter-ornaments" element={<BarterOrnaments />} />
        <Route path="/exchange-ornaments" element={<ExchangeOrnaments />} />
        <Route path="/surrender-ornaments" element={<SurrenderOrnaments />} />

        {/* Orders  */}
        <Route path="/by-orders" element={<ByOrders />} />

        {/* Privilege Collection */}
        <Route path="/privilege-members" element={<PrivilegeMembers />} />
        <Route path="/privilege-Loans" element={<PrivilegeLoans />} />

        {/* Premium Collection */}

        <Route
          path="/premium-collection-add"
          element={<AddPremiumCollection />}
        />
        <Route path="/premium-list" element={<PremiumCollectionList />} />

        {/* Register User */}

        <Route path="/add-admin" element={<AddAdmin />} />
        <Route path="/agent-Detail" element={<AgentDetails />} />
        <Route path="/add-agent-form" element={<AddAgentsForm />} />
        <Route path="/customer-Detail" element={<CustomerDetails />} />
        <Route path="/manager-Detail" element={<LockerManagerDetails />} />
        <Route path="/add-manager-form" element={<AddManagerForm />} />

        {/* setting */}

        <Route path="/setting" element={<Settings/>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
