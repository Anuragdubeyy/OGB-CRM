import { Search } from "lucide-react";
import { Button } from "../../../components/ui/button";
import DataTable from "../../../components/common/DataTable";
import { lockerOrnamentColumn } from "./column";
import {useDownloadExcel}from 'react-export-table-to-excel'
import { useEffect ,useRef} from "react";
import { getLockerOrnamentsListAsync, selectAllLockerOrnamentsList } from "../../../store/slices/lockerOrnaments";
import { useAppDispatch, useAppSelector } from "../../../store/Hooks";

export default function LockerOrnaments() {
  const tableRef=useRef<null>(null)

  const {onDownload}=useDownloadExcel({
    currentTableRef:tableRef.current,
    filename:'Locker-Ornaments',
    sheet:"data" 
  })
  
  const dispatch = useAppDispatch();

  const lockerOrnamentsList = useAppSelector(selectAllLockerOrnamentsList);


  useEffect(() => {
    dispatch(getLockerOrnamentsListAsync());
  }, [dispatch]);

  return (
    <section className="border-2 rounded-3xl p-2" style={{borderColor: "rgba(195, 166, 109, 1)"}}>
      <div className="flex justify-between p-2">
        <div>
          <h2 className="font-bold text-black ">Locker Ornaments</h2>
          <p className=" text-black  text-opacity-70">Total Locker Ornaments :{lockerOrnamentsList.length}</p>
        </div>
        <div className="flex items-center gap-16">
          <div className="flex items-center border border-input bg-background rounded ring-offset-background">
            <Search className="ml-5 text-gray-500" />
              <input
              
                placeholder="Search"
                className="ring-ring max-w-sm h-10 w-80 font-bold px-3 py-2 text-sm file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              </div>
              <Button onClick={onDownload} className="">Download data</Button>
            </div>

            

            
      </div>

      <div className="border border-input -z-[999]  rounded-md mt-3 bg-ornament-bg">
  {/* <table className="w-full table-auto">
    <thead>
      <tr className=" text-black" style={{backgroundColor:"#EDE6D8"}}>
        <th className="py-2 px-4">Product ID</th>
        <th className="py-2 px-4">Ornament Name</th>
        <th className="py-2 px-4">Image</th>
        <th className="py-2 px-4">Price (Rs)</th>
        <th className="py-2 px-4">Customer Name</th>
        <th className="py-2 px-4">Mobile</th>
        <th className="py-2 px-4">Weight(gm)</th>
        <th className="py-2 px-4">Category</th>
        <th className="py-2 px-4">Carat</th>
        <th className="py-2 px-4">Height</th>
        <th className="py-2 px-4">Width</th>
        <th className="py-2 px-4">Status</th>
      </tr>
    </thead>
    Your table body content goes here
  </table> */}
  <DataTable tableRef={tableRef} columns={lockerOrnamentColumn} data={lockerOrnamentsList}/>
</div>

    </section>
  )
}
