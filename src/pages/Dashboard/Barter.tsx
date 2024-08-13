import { NavLink } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import { barterColumn, overviewColumn } from "./column";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import {
  getDashboardOverviewListAsync,
  selectAllDashboardOverviewList,
} from "../../store/slices/dashboardOverview";
import { useEffect, useState } from "react";
// import { ArrowRight } from "lucide-react";
import ChartComponent from "../../components/common/ChartComponent";
import SelectComponent from "../../components/common/SelectComponent";
import { buildUrlWithParams } from "../../lib/utils";
import { API_URL, graphOptions } from "../../constant";
import axios from "axios";
import { getDashboardBarterListAsync, selectAllDashboardBarterList } from "../../store/slices/dashboardBarter";
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
export default function BarterDashboard() {
  const dispatch = useAppDispatch();
  const overviewList = useAppSelector(selectAllDashboardOverviewList);

  const BarterRequestList = useAppSelector(selectAllDashboardBarterList);

  useEffect(() => {
    dispatch(getDashboardOverviewListAsync());
    dispatch(getDashboardBarterListAsync());
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
        text: "Barter",
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
        const url = buildUrlWithParams(API_URL.GET_GOLD_BARTER_CHART, {
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
        const data = response.data.data[selectedOption] || [];
        console.log(data)
        const dataArray = Object.entries(data).map(([key, gold
        ]) => ({
          data:key, gold
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
        label: "Barter",
        data: data.map((data) => {
          console.log(data);
          return data;
        }),
        borderColor: "#C3A66D",
        backgroundColor: "#C3A66D",
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
                  ? " bg-primary-gradient border-b-2 border-[#C3A66D] text-[#C3A66D] mr-3 "
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
                  ? " bg-primary-gradient border-b-2 border-[#C3A66D] text-[#C3A66D] mr-3 "
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
      >
        <DataTable tableRef={[]} columns={overviewColumn} data={overviewList} />
      </div>
      <div className="flex gap-6  mt-8">
        <div
          className="w-[60%]  bg-white border-2  rounded-2xl"
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
          className="w-[40%]  bg-white border-2  rounded-2xl"
          style={{ borderColor: "rgba(195, 166, 109, 0.60)" }}
        >
          <div className=" w-full flex justify-between pl-5 py-3 border-input">
            <h2 className="text-black text-xl font-semibold">Recent Request</h2>
            <div className=" gap-4 pr-5">
              {/* <button className="flex gap-1 ">
                View All
                <ArrowRight className="w-5 h-11 pb-4 overflow-hidden rounded-full" />
               
              </button> */}

            </div>
          
          </div>
          <div
        className="border border-input rounded-md m-2  z-30 relative bg-ornament-bg ">
        <DataTable tableRef={[]} columns={barterColumn} data={BarterRequestList} />
      </div>

        </div>
      </div>
    </div>
  );
}
