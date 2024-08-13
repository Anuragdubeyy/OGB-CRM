import { Search } from "lucide-react";
import { Button } from "../../../components/ui/button";
import DataTable from "../../../components/common/DataTable";
import { depositeOrnamentColumn } from "./column";
import { useEffect ,useRef, useState} from "react";
import {
  getDepositOrnamentsListAsync,
  selectAllDepositOrnamentsList,
} from "../../../store/slices/depositOrnaments";
import { useAppDispatch, useAppSelector } from "../../../store/Hooks";
import {useDownloadExcel} from 'react-export-table-to-excel'
import _debounce from 'lodash/debounce';


export default function DepositOrnaments() {
  const tableRef=useRef<null>(null)
  const {onDownload}=useDownloadExcel({
    currentTableRef:tableRef.current,
    filename:"deposit-ornaments",
    sheet:'data'
  })
  const dispatch = useAppDispatch();

  const depositOrnamentsList = useAppSelector(selectAllDepositOrnamentsList);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(depositOrnamentsList);

  const debouncedSearch = _debounce((value: string) => {
    const lowerCaseValue = value.toLowerCase();
    const filteredData= depositOrnamentsList.filter((item) => {
      const lowerCaseCategory = item.category.toLowerCase();
      const lowerCaseOrnamentName = item.ornament_name.toLowerCase();
      const lowerCaseCustomerName = item.user_name.toLowerCase();
      const lowerCaseCustomerMobile = item.user_mobile.toLowerCase();


      return (
        lowerCaseCategory.includes(lowerCaseValue) ||
        lowerCaseOrnamentName.includes(lowerCaseValue) ||
        lowerCaseCustomerName.includes(lowerCaseValue) ||
        lowerCaseCustomerMobile.includes(lowerCaseValue)
      );
    });

    setFilteredData(filteredData);
  }, 300);

  useEffect(() => {
    dispatch(getDepositOrnamentsListAsync());
  }, [dispatch]);

  useEffect(() => {
    debouncedSearch(searchTerm)
  },[searchTerm, debouncedSearch])

  return (
    <section
      className="border-2 rounded-3xl p-2"
      style={{ borderColor: "rgba(195, 166, 109, 1)" }}
    >
      <div className="flex justify-between p-2">
        <div>
          <h2 className="font-bold text-black ">Deposited Ornaments</h2>
          <p className=" text-black  text-opacity-70">
            Total Deposited Ornaments :{filteredData.length} 
          </p>
        </div>
        <div className="flex items-center gap-16">
          <div className="flex items-center border border-input bg-background rounded ring-offset-background">
            <Search className="ml-5 text-gray-500" />
            <input
              placeholder="Search"
              className="ring-ring max-w-sm h-10 w-80 font-bold px-3 py-2 text-sm file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={onDownload} className="">Download data</Button>
        </div>
      </div>

      <div className="border border-input rounded-md mt-3 z-30 relative bg-ornament-bg overflow-scroll">
        
        <DataTable
          tableRef={tableRef}
          columns={depositeOrnamentColumn}
          data={filteredData}
        />
      </div>
    </section>
  );
}
