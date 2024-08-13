import { Search } from "lucide-react";
import { Button } from "../../../components/ui/button";
import DataTable from "../../../components/common/DataTable";
import { privilegeLoanColumn } from "./column";
import { useAppDispatch, useAppSelector } from "../../../store/Hooks";
import { getPrivilegeLoansListAsync, selectAllPrivilegeLoansList } from "../../../store/slices/privilegeLoans";
import { useEffect ,useRef, useState} from "react";
import {useDownloadExcel} from 'react-export-table-to-excel'
import _debounce from 'lodash/debounce';

export default function PrivilegeLoans() {
  const dispatch = useAppDispatch();
  const tableRef=useRef<null>(null)

  const {onDownload}=useDownloadExcel({
    currentTableRef:tableRef.current,
    filename:'Privilege Members Loans',
    sheet:"data"
  })
  

  const privilegeLoanList = useAppSelector(selectAllPrivilegeLoansList);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(privilegeLoanList);

  const debouncedSearch = _debounce((value: string) => {
    const lowerCaseValue = value.toLowerCase();
    const filteredData = privilegeLoanList.filter((item) => {
      const lowerCaseCategory = item.user_name.toLowerCase();
      const lowerCaseOrnamentName = item.user_mobile.toLowerCase();

      return (
        lowerCaseCategory.includes(lowerCaseValue) ||
        lowerCaseOrnamentName.includes(lowerCaseValue)
              );
    });

    setFilteredData(filteredData);
  }, 300);
  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    dispatch(getPrivilegeLoansListAsync());
  }, [dispatch]);
  return (
    <section className="border-2 rounded-3xl p-2" style={{borderColor: "rgba(195, 166, 109, 1)"}}>
      <div className="flex justify-between p-2">
        <div>
          <h2 className="font-bold text-black ">Privilege Members</h2>
          <p className=" text-black  text-opacity-70">Total Members : {privilegeLoanList.length}</p>
        </div>
        <div className="flex items-center gap-16">
          <div className="flex items-center border border-input bg-background rounded ring-offset-background">
            <Search className="ml-5 text-gray-500" />
              <input
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="ring-ring max-w-sm h-10 w-80 font-bold px-3 py-2 text-sm file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              </div>
              <div className="flex gap-3">
              <Button>History</Button>
              <Button onClick={onDownload} className="">Download data</Button>
              </div>
            </div>

            

            
      </div>

      <div className="border border-input rounded-md mt-3 bg-ornament-bg">
      <DataTable tableRef={tableRef} columns={privilegeLoanColumn} data={filteredData}/>
</div>

    </section>
  )
}
