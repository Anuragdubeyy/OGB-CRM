import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/Hooks";

import DataTable from "../../../../components/common/DataTable";
import { settleLoanColumn } from "./column";
import {
  getPrivilegeLoansListAsync,
  selectAllSettlementList,
} from "../../../../store/slices/privilegeLoans";


export const ViewSettlements = () => {
  const dispatch = useAppDispatch();

  const privilegeUserList = useAppSelector(selectAllSettlementList);
console.log(privilegeUserList);

  useEffect(() => {
    dispatch(getPrivilegeLoansListAsync());
  }, [dispatch]);

  return (
    <div className="border border-input rounded-md mt-3 z-30 relative bg-ornament-bg ">
      <DataTable tableRef={[]} columns={settleLoanColumn} data={privilegeUserList} />
    </div>
  );
};
