import { Search } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { customerColumn } from "./column";
import { useAppDispatch, useAppSelector } from "../../../store/Hooks";
import { getRegisterCustomerListAsync, selectAllRegisterCustomerList } from "../../../store/slices/registerCustomer";
import { useEffect ,useRef} from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import DataTable from "../../../components/common/DataTable";

export default function CustomerDetails() {
  const tableRef=useRef<null>(null)

  const {onDownload}=useDownloadExcel({
    currentTableRef:tableRef.current,
    filename:'Customers_Details',
    sheet:"data" 
  })
  
  const dispatch = useAppDispatch();

  const customerList = useAppSelector(selectAllRegisterCustomerList);

  useEffect(() => {
    dispatch(getRegisterCustomerListAsync());
  }, [dispatch]);
  return (
    <section className="border-2 rounded-3xl p-2" style={{borderColor: "rgba(195, 166, 109, 1)"}}>
      <div className="flex justify-between p-2">
        <div>
          <h2 className="font-bold text-black ">Customer Details</h2>
          <p className=" text-black  text-opacity-70">Total Customer : 9</p>
        </div>
        <div className="flex items-center gap-16">
          <div className="flex items-center border border-input bg-background rounded ring-offset-background">
            <Search className="ml-5 text-gray-500" />
              <input
              
                placeholder="Search"
                className="ring-ring max-w-sm h-10 w-80 font-bold px-3 py-2 text-sm file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              </div>
              <Button onClick={onDownload} className="">Download data</Button>
            </div>

            

            
      </div>

      <div className="border border-input rounded-md mt-3 bg-ornament-bg">
  
  <DataTable tableRef={tableRef} columns={customerColumn} data={customerList}/>
</div>

    </section>
  )
}
