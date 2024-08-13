import { Search } from "lucide-react";
import { Button } from "../../../components/ui/button";
import DataTable from "../../../components/common/DataTable";
import {  displayOrnamentColumn } from "./column";
import { getDisplayOrnamentsListAsync, selectAllDisplayOrnamentsList } from "../../../store/slices/displayOrnaments";
import { useEffect ,useRef, useState} from "react";
import {useDownloadExcel} from 'react-export-table-to-excel'
import { useAppDispatch, useAppSelector } from "../../../store/Hooks";
import _debounce from 'lodash/debounce';

export default function DisplayOrnaments() {
  const tableRef=useRef<null>(null)
  const {onDownload}=useDownloadExcel({
    currentTableRef:tableRef.current,
    filename:"Display-Ornaments",
    sheet:'excel'
  })
  const dispatch = useAppDispatch();

  const displayOrnamentsList = useAppSelector(selectAllDisplayOrnamentsList);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(displayOrnamentsList);

  const debouncedSearch = _debounce((value:string) => {
    const lowerCaseValue = value.toLowerCase();
    const filteredData = displayOrnamentsList.filter((item)=> {
      
      const lowerCaseCategory = item.category.toLowerCase();
      const lowerCaseOrnamentName = item.ornament_name.toLowerCase();
      const lowerCaseOrnamentCarat = item.carat.toLowerCase();

      return (
        lowerCaseCategory.includes(lowerCaseValue) ||
        lowerCaseOrnamentName.includes(lowerCaseValue) ||
        lowerCaseOrnamentCarat.includes(lowerCaseValue)     
        );
    });
    setFilteredData(filteredData);

  }, 300);

  useEffect(()=>{
    debouncedSearch(searchTerm)
  },[searchTerm, debouncedSearch])


  useEffect(() => {
    dispatch(getDisplayOrnamentsListAsync());
  }, [dispatch]);
  return (
    <section className="border-2 rounded-3xl p-2" style={{borderColor: "rgba(195, 166, 109, 1)"}}>
      <div className="flex justify-between p-2">
        <div>
          <h2 className="font-bold text-black ">Display Ornaments</h2>
          <p className=" text-black  text-opacity-70">Total Display Ornaments :{filteredData.length} </p>
        </div>
        <div className="flex items-center gap-16">
          <div className="flex items-center border border-input bg-background rounded ring-offset-background">
            <Search className="ml-5 text-gray-500" />
              <input
                value={searchTerm}
                placeholder="Search"
                className="ring-ring max-w-sm h-10 w-80 font-bold px-3 py-2 text-sm file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                onChange={(e)=> setSearchTerm(e.target.value)}
              />
              </div>
              <Button onClick={onDownload} className="">Download data</Button>
            </div>

            

            
      </div>

      <div className="border border-input rounded-md mt-3 -z-[999] relative bg-ornament-bg">
  

  <DataTable tableRef={tableRef} columns={displayOrnamentColumn} data={filteredData}/>
</div>

    </section>
  )
}
