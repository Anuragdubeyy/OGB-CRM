import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import {
  getDashboardOverviewListAsync,
  getDashboardOverviewRecentSlotListAsync,
  getDashboardOverviewRequestListAsync,
  selectAllDashboardOverviewList,
  selectDashboardOverviewBookingSlot,
  selectDashboardOverviewRecentRequest,
} from "../../store/slices/dashboardOverview";
import { bookingSlotColumn, overviewColumn, overviewRecentRequestColumn } from "./column";
import {
  getAllAlertListAsync,
  selectAllAlertList,
} from "../../store/slices/dashboardAlert";
import { API_URL, ImageDomain, graphOptions } from "../../constant";
import { ArrowRight } from "lucide-react";
import { buildUrlWithParams } from "../../lib/utils";
import axios from "axios";
import SelectComponent from "../../components/common/SelectComponent";
import ChartComponent from "../../components/common/ChartComponent";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import OverviewAlert from "../../components/form/Dashboard/overviewAlert";
import OverviewRequest from "../../components/form/Dashboard/overviewRequest";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    borderWidth: number;
  }[];
}
export default function Dashboard() {
  const dispatch = useAppDispatch();

  const alertList = useAppSelector(selectAllAlertList);
  console.log(alertList);
  const totalAlerts = alertList.loanAlert.length + alertList.barterAlert.length;
  const overviewList = useAppSelector(selectAllDashboardOverviewList);
  const recentRequestList = useAppSelector(selectDashboardOverviewRecentRequest);
  const [showAll, setShowAll] = useState(false);
  const bookingSlot = useAppSelector(selectDashboardOverviewBookingSlot);
  // console.log(bookingSlot);

  //slice  data for recent Request data
  const slicedData = showAll ? recentRequestList : recentRequestList.slice(0, 3);

  // split data for booking slot
  const bookingSlotData = Object.entries(bookingSlot).map(([timeSlot, value]) => ({
    timeSlot,
    value,
  }));
  // console.log(bookingSlotData)
  

  useEffect(() => {
    dispatch(getDashboardOverviewListAsync());
    dispatch(getAllAlertListAsync());
    dispatch(getDashboardOverviewRequestListAsync());
    dispatch(getDashboardOverviewRecentSlotListAsync());
  }, [dispatch]);

  const [selectedOption, setSelectedOption] = useState("this_week");
  const [thisWeekChartData, setThisWeekChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  const [lastWeekChartData, setLastWeekChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  const [thisMonthChartData, setThisMonthChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  const [lastSixMonthsChartData, setLastSixMonthsChartData] =
    useState<ChartData>({
      labels: [],
      datasets: [],
    });
  // const [customChartData, setCustomeChartData] = useState({
  //   labels: [],
  //   datasets: [],
  // });

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Collected & Withdraw Gold",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = buildUrlWithParams(API_URL.GET_OVERVIEW_GOLD_CHART, {
          period: selectedOption,
        });
        const headers = {
          Authorization: localStorage.getItem("ogbToken"),
          admin_id: localStorage.getItem("userId"),
        };
        const response = await axios.get(url, {
          headers: headers,
        });
        console.log(response);
        const data = response.data.data.filter[selectedOption] || [];
        console.log(data)
        const dataArray = Object.entries(data).map(([key, gold]) => ({
          data:key, gold,
        }));
        const datasets = getDatasets(dataArray);
        const labels = Object.keys(data);

        switch (selectedOption) {
          case "this_week":
            setThisWeekChartData({ labels, datasets });
            break;
          case "last_week":
            setLastWeekChartData({ labels, datasets });
            break;
          case "monthly":
            setThisMonthChartData({ labels, datasets });
            break;
          case "yearly":
            setLastSixMonthsChartData({ labels, datasets });
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Error fetching chart data", error);
      }
    };
    // dispatch(getDashboardOverviewChartListAsync())
    fetchData();
  }, [selectedOption]);

  function getDatasets(data: any[]) {
    return [
      {
        label: "collect",
        data: data.map((data) => {
          console.log(data);
          return data.responses.collectedGold;
          console.log(data.collectedGold)
        }),
        borderColor: "#C3A66D",
        backgroundColor: "#C3A66D",
        borderWidth: 2,
      },
      {
        label: "withdraw",
        data: data.map((data) => {data.responses.withdrawnGold
          console.log(data.responses.withdrawnGold)
        }),
        borderColor: "gray-800",
        backgroundColor: "gray-800",
        borderWidth: 2,
      },
    ];
  }

  const handleSelectChange = (selected: string) => {
    setSelectedOption(selected);
  };
  useEffect(() => {
    const isUserAuthenticated = localStorage.getItem("isUserAuthenticated");
    console.log(
      "isUserAuthenticated",
      localStorage.getItem("isUserAuthenticated")
    );
    if (!isUserAuthenticated || isUserAuthenticated == "false") {
      // router.push("/login");
    }
  }, []);

  return (
    <div>
      <section
        className="border-2 rounded-3xl p-2"
        style={{ borderColor: "rgba(195, 166, 109, 0.60)" }}
      >
        <div className="w-full  ">
        <ul className="flex justify-between py-4 px-9">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? " bg-primary-gradient border-b-2 border-[#C3A66D] text-[#C3A66D] mr-3 "
                  : " text-black"
              }
              to="/dashboard"
            >
              <li className="font-semibold  text-xl   "> Overview</li>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? " bg-primary-gradient border-b-2 border-[#C3A66D] text-[#C3A66D] mr-3 "
                  : " text-black"
              }
              to="/deposit"
            >
              <li className=" font-semibold text-xl  ">Deposit</li>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? " bg-primary-gradient border-b-2 border-[#C3A66D] text-[#C3A66D] mr-3 "
                  : " text-black"
              }
              to="/withdraw"
            >
              <li className="font-semibold text-xl  ">Withdraw</li>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? " bg-primary-gradient border-b-2 border-[#C3A66D] text-[#C3A66D] mr-3 "
                  : " text-black"
              }
              to="/barter"
            >
              <li className="font-semibold text-xl  ">Barter</li>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? " bg-primary-gradient border-b-2 border-[#C3A66D] text-[#C3A66D] mr-3"
                  : " text-black"
              }
              to="/display"
            >
              <li className="font-semibold text-xl ">Display</li>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? " bg-primary-gradient border-b-2 border-[#C3A66D] text-[#C3A66D] mr-3 "
                  : " text-black"
              }
              to="/sold"
            >
              <li className="font-semibold text-xl "> Sold</li>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? " bg-primary-gradient border-b-2 border-[#C3A66D] text-[#C3A66D] mr-3"
                  : " text-black"
              }
              to="/immediate-sell"
            >
              <li className="font-semibold text-xl ">
                Immediate Sell
              </li>
            </NavLink>
          </ul>
        </div>
      </section>

      <div
        className="border border-input rounded-md mt-3 z-30 relative bg-ornament-bg "
        // style={{
        //         backgroundColor: "rgba(233, 224, 208, 0.76 )",
        //         borderColor: "rgba(0, 0, 0, 0.30)",
        //       }}
      >
        <DataTable tableRef={[]} columns={overviewColumn} data={overviewList} />
      </div>
      <div className=" flex gap-6  mt-8">
        <div
          className="w-[60%] flex gap-2  bg-white border-2  rounded-2xl"
          style={{ borderColor: "rgba(195, 166, 109, 0.60)" }}
        >
        

          <div className=" w-full   p-2 rounded">
            <div className="flex  justify-end">
              <SelectComponent
                selectedOption={selectedOption}
                onValueChange={handleSelectChange}
                options={graphOptions}
              />
            </div>
            <ChartComponent
              chartData={
                selectedOption === "this_week"
                  ? thisWeekChartData
                  : selectedOption === "last_week"
                  ? lastWeekChartData
                  : selectedOption === "this_month"
                  ? thisMonthChartData
                  : lastSixMonthsChartData
              }
              options={options}
            />
          </div>
        </div>

        <div
          className="w-[40%] bg-white border-2 rounded-2xl"
          style={{ borderColor: "rgba(195, 166, 109, 0.60)" }}
        >
          <div className=" flex justify-between ml-5  my-3 ">
            <div className="flex  gap-4">
              <h3 className="text-xl font-semibold">Alert</h3>
              <h5 className="bg-[#CDB585] w-7 h-7  text-center rounded-2xl">
                {totalAlerts}
              </h5>
            </div>
            <div className="flex gap-4 pr-5">

            <Dialog>
            <DialogTrigger asChild>
              <div className="flex gap-1 cursor-pointer">
              View All
                <ArrowRight className="w-5 h-11 pb-4 overflow-hidden rounded-full" />
              </div>
            </DialogTrigger>
            <DialogContent className="max-h-[80%] overflow-scroll ">
              <DialogHeader>
                <DialogTitle>View All Alert</DialogTitle>
                
              </DialogHeader>
                <OverviewAlert totalAlert={'totalAlert'}/>
              {/* <ViewDepositOrnamentImage ornamentId={row.getValue('ornament_id')} /> */}
            </DialogContent>
          </Dialog>
              <button className="flex gap-1 ">
              
              </button>
            </div>
          </div>
          {alertList.barterAlert.map((alert, index) => (
            <div className=" flex justify-between ml-5  my-3 ">
              <div key={index} className="flex  gap-4">
                <img
                  className="w-11 h-11 overflow-hidden rounded-full"
                  src={ImageDomain + "/" + alert.userImage}
                  alt=""
                ></img>

                <div>
                  <h3 className="text-normal font-semibold">{alert.user}</h3>
                  <h2>
                    Barter ornament not return {alert.BarterdaysAhead} days
                  </h2>
                </div>
              </div>
              <div className="flex gap-4 pr-5">
                <button className="flex gap-1 ">7 : 15AM</button>
              </div>
            </div>
          ))}
          {alertList.loanAlert.map((alert, index) => (
            <div className=" flex justify-between ml-5  my-3 ">
              <div key={index} className="flex  gap-4">
                <img
                  className="w-11 h-11 overflow-hidden rounded-full"
                  src={ImageDomain + "/" + alert.userImage}
                  alt=""
                ></img>

                <div>
                  <h3 className="text-normal font-semibold">{alert.user}</h3>
                  <h2>Loan due to for {alert.daysAhead} days</h2>
                </div>
              </div>
              <div className="flex gap-4 pr-5">
                <button className="flex gap-1 ">7 : 15AM</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-6  mt-8">
        <div
          className="w-[60%]  bg-white border-2  rounded-2xl"
          style={{ borderColor: "rgba(195, 166, 109, 0.60)" }}
        >
          <div className=" w-full flex justify-between pl-5 py-3 border-input">
            <h2 className="text-black text-xl font-semibold">Recent Request</h2>
            <div className=" gap-4 pr-5">
            <Dialog>
            <DialogTrigger asChild>
              <div className="flex gap-1 cursor-pointer" onClick={() => setShowAll(!showAll)} >
              {/* {showAll ? 'Show Less' : 'View More'} */}
              View More
                <ArrowRight className="w-5 h-11 pb-4 overflow-hidden rounded-full" />
              </div>
            </DialogTrigger>
            <DialogContent className="max-h-[90%]  max-w-[60%]  ">
              <DialogHeader>
                <DialogTitle>View All Request</DialogTitle>
                
              </DialogHeader>
                <OverviewRequest
                viewMore={'view more'}/>
            </DialogContent>
          </Dialog>
              
            </div>
          </div>
          <div className="p-2 pt-0 h-72">

          <DataTable tableRef={[]} columns={overviewRecentRequestColumn} data={slicedData} />
          </div>
        </div>

        <div
          className="w-[40%] bg-white border-2 rounded-2xl"
          style={{ borderColor: "rgba(195, 166, 109, 0.60)" }}
        >
          <div className=" flex  ml-5  my-3 ">
            <h3 className="text-xl font-semibold">Booking Slots</h3>
          </div>
          <div className="overflow-scroll h-72">
          <DataTable tableRef={[]} columns={bookingSlotColumn} data={bookingSlotData} />

          </div>
        </div>
      </div>

      {/* <div className="flex justify-between p-2">
              

        <div>
          
          <p className=" text-black  text-opacity-70">Total barter ornaments : 9</p>
        </div>
        <div className="flex items-center gap-16">
          <div className="flex items-center border border-input bg-background rounded ring-offset-background">
           
             
              </div>
             
            </div>

            

            
      </div> */}
    </div>
  );
}
