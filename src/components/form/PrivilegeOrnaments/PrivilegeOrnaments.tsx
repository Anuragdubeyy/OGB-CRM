// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';import { useEffect } from "react";
import { useEffect } from "react";
// import {  getCasesByAgentAsync, selectAgentCases } from "../../store/slices/cases";
import {
  useAppDispatch, useAppSelector,
} from "../../../store/Hooks";
import { privilegeOrnamentsColumn } from "./column";
import DataTable from "../../common/DataTable";

import { PrivilegeUser, getPrivilegeUserListAsync, selectAllPrivilegeUserList } from "../../../store/slices/privilegeUser";

interface IProps{
privilege: PrivilegeUser
}

export const ViewPrivilegeUser = ({privilege} : IProps) => {
  
  const {
    user_id
  } = privilege
  const dispatch = useAppDispatch();

  const privilegeUserList = useAppSelector(selectAllPrivilegeUserList);

  useEffect(() => {
    dispatch(getPrivilegeUserListAsync(user_id));
  }, [dispatch, user_id]);

  return (
    <div className="border border-input m-0 p-0 rounded-md mt-3 z-30 relative bg-ornament-bg overflow-scroll">
      <DataTable tableRef={[]} columns={privilegeOrnamentsColumn} data={privilegeUserList}/>

</div>
  );
};
