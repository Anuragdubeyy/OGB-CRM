import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/Hooks";
import { getAllAlertListAsync, selectAllAlertList } from "../../../store/slices/dashboardAlert";
import { ImageDomain } from "../../../constant";

export interface IProps{
    totalAlert: string;
}
export default function OverviewAlert({totalAlert}: IProps) {

    const dispatch = useAppDispatch();

  const alertList = useAppSelector(selectAllAlertList);
  console.log(alertList);

  useEffect(() => {
    dispatch(getAllAlertListAsync());
  }, [dispatch, totalAlert]);
  return <div
  className="w-full bg-white border-2 rounded-2xl"
  style={{ borderColor: "rgba(195, 166, 109, 0.60)" }}
>
  <div className=" flex justify-between ml-5  my-3 ">
    
    <div className="flex gap-4 pr-5">
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
}
