import { Search } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import DataTable from "../../../../components/common/DataTable";
import { premiumListColumn } from "./Column";
import { useAppDispatch, useAppSelector } from "../../../../store/Hooks";
import { getPremiumCollectionListAsync, selectAllPremiumCollectionList } from "../../../../store/slices/premiumCollectionList";
import { useEffect ,useRef, useState} from "react";
import {useDownloadExcel} from 'react-export-table-to-excel'
import _debounce from 'lodash/debounce';

export default function PremiumCollectionList() {
  const dispatch = useAppDispatch();
  const tableRef=useRef<null>(null)

  const {onDownload}=useDownloadExcel({
    currentTableRef:tableRef.current,
    filename:'premium collection list',
    sheet:"data" 
  })
  

  const premiumCollectionList = useAppSelector(selectAllPremiumCollectionList);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(premiumCollectionList);

  const debouncedSearch = _debounce((value: string) => {
    const lowerCaseValue = value.toLowerCase();
    const filteredData = premiumCollectionList.filter((item) => {
      const lowerCaseCategory = item.category.toLowerCase();
      const lowerCaseOrnamentName = item.ornament_name.toLowerCase();
      const lowerCaseCustomerOtherStone = item.other_stones.toLowerCase();
      const lowerCaseOtherMetals = item.other_metals.toLowerCase();

      return (
        lowerCaseCategory.includes(lowerCaseValue) ||
        lowerCaseOrnamentName.includes(lowerCaseValue) ||
        lowerCaseCustomerOtherStone.includes(lowerCaseValue)  ||
        lowerCaseOtherMetals.includes(lowerCaseValue)
      );
    });

    setFilteredData(filteredData);
  }, 300);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    dispatch(getPremiumCollectionListAsync());
  }, [dispatch]);
  return (
    <section className="border-2 rounded-3xl p-2" style={{borderColor: "rgba(195, 166, 109, 1)"}}>
      <div className="flex justify-between p-2">
        <div>
          <h2 className="font-bold text-black ">Premium Collection List</h2>
          <p className=" text-black  text-opacity-70">Total Collection Ornaments : 9</p>
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
              <Button onClick={onDownload} className="">Download data</Button>
            </div>

            

            
      </div>

      <div className="border border-input rounded-md mt-3 bg-ornament-bg">
  
  <DataTable tableRef={tableRef} columns={premiumListColumn} data={filteredData}/>
</div>

    </section>
  )
}
