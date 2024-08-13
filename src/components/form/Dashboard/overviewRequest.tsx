import { useEffect } from "react";
import { overviewRecentRequestColumn } from "../../../pages/Dashboard/column";
import { useAppDispatch, useAppSelector } from "../../../store/Hooks";
import { getDashboardOverviewRequestListAsync, selectDashboardOverviewRecentRequest } from "../../../store/slices/dashboardOverview";
import DataTable from "../../common/DataTable";

export interface IProps{
    viewMore: string;
}
export default function OverviewRequest({viewMore}: IProps) {
    const dispatch = useAppDispatch();

    const recentRequestList = useAppSelector(selectDashboardOverviewRecentRequest);
    useEffect(()=> {
        dispatch(getDashboardOverviewRequestListAsync());
    },[dispatch, viewMore])
    return (
    <div
        className="w-full bg-white border-2 rounded-2xl overflow-scroll"
        style={{ borderColor: "rgba(195, 166, 109, 0.60)" }}
    >
        <div className=" flex justify-between ml-5  my-3 ">
        <div className="flex gap-4 pr-5"></div>
        </div>
        <div className="p-2 pt-0 h-72 ">

<DataTable tableRef={[]} columns={overviewRecentRequestColumn} data={recentRequestList} />
</div>
    </div>
    );
}
