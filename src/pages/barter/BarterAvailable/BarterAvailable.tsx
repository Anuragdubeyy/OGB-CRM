import { Search } from "lucide-react";
import DataTable from "../../../components/common/DataTable";
import { Button } from "../../../components/ui/button";
import { useAppDispatch, useAppSelector } from "../../../store/Hooks";
import {
  getBarterAvailableListAsync,
  selectAllBarterAvailableList,
} from "../../../store/slices/barterAvailable";
import { barterAvailableColumn } from "./column";
import { useEffect, useRef, useState } from "react";
import { useDownloadExcel } from 'react-export-table-to-excel';
import _debounce from 'lodash/debounce';

export default function BarterAvailable() {
  const tableRef = useRef<null>(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "barter-available",
    sheet: "data",
  });

  const dispatch = useAppDispatch();
  const barterAvailableList = useAppSelector(selectAllBarterAvailableList);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(barterAvailableList);

  const debouncedSearch = _debounce((value: string) => {
    const lowerCaseValue = value.toLowerCase();
    const filteredData = barterAvailableList.filter((item) => {
      const lowerCaseCategory = item.category.toLowerCase();
      const lowerCaseOrnamentName = item.ornament_name.toLowerCase();
      const lowerCaseCustomerName = item.user_name.toLowerCase();
      const lowerCaseOrnamentId = item.ornament_id.toLowerCase();

      return (
        lowerCaseCategory.includes(lowerCaseValue) ||
        lowerCaseOrnamentName.includes(lowerCaseValue) ||
        lowerCaseOrnamentId.includes(lowerCaseValue)  ||
        lowerCaseCustomerName.includes(lowerCaseValue)
      );
    });

    setFilteredData(filteredData);
  }, 300);

  useEffect(() => {
    dispatch(getBarterAvailableListAsync());
  }, [dispatch]);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  return (
    <section className="border-2 rounded-3xl p-2" style={{ borderColor: "rgba(195, 166, 109, 1)" }}>
      <div className="flex justify-between p-2">
        <div>
          <h2 className="font-bold text-black ">Available Barter Ornaments</h2>
          <p className=" text-black  text-opacity-70">
            Total barter ornaments : {filteredData.length}
          </p>
        </div>
        <div className="flex items-center gap-16">
          <div className="flex items-center border border-input bg-background rounded ring-offset-background">
            <Search className="ml-5 text-gray-500" />
            <input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ring-ring max-w-sm h-10 w-80 font-bold px-3 py-2 text-sm file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Button onClick={onDownload} className="">
            Download data
          </Button>
        </div>
      </div>

      <div className="border border-input -z-[999] relative rounded-md mt-3 bg-ornament-bg">
        <DataTable tableRef={tableRef} columns={barterAvailableColumn} data={filteredData} />
      </div>
    </section>
  );
}