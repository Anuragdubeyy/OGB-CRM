import { Search } from "lucide-react";
import { Button } from "../../../components/ui/button";
import DataTable from "../../../components/common/DataTable";
import { categoriesOrnamentColumn } from "./column";
import { useEffect ,useRef, useState} from "react";
import { useAppDispatch, useAppSelector } from "../../../store/Hooks";
import {useDownloadExcel} from 'react-export-table-to-excel'
import { getCategoriesOrnamentsListAsync, selectAllCategoriesOrnamentsList } from "../../../store/slices/categoriesOrnaments";
import _debounce from 'lodash/debounce';

export default function CategoriesOrnaments() {
  const tableRef=useRef<null>(null)
  const {onDownload}=useDownloadExcel({
    currentTableRef:tableRef.current,
    filename:"categories-ornaments",
    sheet:'excel'
  })
  const dispatch = useAppDispatch();

  const categriesOrnamentsList = useAppSelector(selectAllCategoriesOrnamentsList);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(categriesOrnamentsList);

  const debouncedSearch = _debounce((value: string) => {
    const lowerCaseValue = value.toLowerCase();
    const filteredData = categriesOrnamentsList.filter((item) => {
      const lowerCaseCategory = item.category.toLowerCase();

      return (
        lowerCaseCategory.includes(lowerCaseValue)               );
    });

    setFilteredData(filteredData);
  }, 300);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);


  useEffect(() => {
    dispatch(getCategoriesOrnamentsListAsync());
  }, [dispatch]);
  return (
    <section className="border-2 rounded-3xl p-2" style={{borderColor: "rgba(195, 166, 109, 1)"}}>
      <div className="flex justify-between p-2">
        <div>
          <h2 className="font-bold text-black ">Categories</h2>
          <p className=" text-black  text-opacity-70">Total Category : {filteredData.length}</p>
        </div>
        <div className="flex items-center gap-16">
          <div className="flex items-center border border-input bg-background rounded ring-offset-background">
            <Search className="ml-5 text-gray-500" />
              <input
                value={searchTerm}
                placeholder="Search"
                className="ring-ring max-w-sm h-10 w-80 font-bold px-3 py-2 text-sm file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              </div>
              <Button onClick={onDownload} className="">Download data</Button>
            </div>

            

            
      </div>

      <div className="border border-input rounded-md mt-3 bg-ornament-bg">

  <DataTable tableRef={tableRef} columns={categoriesOrnamentColumn} data={filteredData}/>
</div>

    </section>
  )
}
