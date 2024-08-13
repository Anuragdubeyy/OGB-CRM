import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

import { ImageDomain, RowType } from "../../../../constant";
import { useAppDispatch, useAppSelector } from "../../../../store/Hooks";
import { getCustomerOtcBarterAddAsync, getCustomerOtcBarterRemoveAsync } from "../../../../store/slices/customerOtcBarter";
import { selectCheckUserId } from "../../../../store/slices/userCheck";

export const barterColumn = [
  {
    accessorKey: "ornament_name",
    header: "Ornament Name",
  },
  {
    accessorKey: "image",
    header: "Ornament Image",
    cell: ({ row }: { row: RowType }) => (
      <div className="h-12 w-12 object-cover overflow-hidden mx-auto border rounded-md">
        <img
          className="object-cover h-full w-full"
          src={ImageDomain + "/" + row.getValue("image")}
          alt=""
        />
      </div>
    ),
  },
  {
    accessorKey: "gold_weight",
    header: "Weight",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: 'name',
    header: 'Action',
    cell: ({ row }: { row: RowType }) => {
      const dispatch = useAppDispatch();
      const checkUserId = useAppSelector(selectCheckUserId);
      const ornament_id = row.original.ornament_id;

    

      
      const handleChange = (e:any) => {
console.log(e)
if (
  e === "add"
){
  dispatch(getCustomerOtcBarterAddAsync({ userid: checkUserId, ornament_id }));

} else {
  dispatch(getCustomerOtcBarterRemoveAsync({ userid: checkUserId, ornament_id }));

}
      }

      return (
        <div className='flex gap-2'>
        {row.original.status === "isInLocker" && (
          <Select onValueChange={(e) => handleChange(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Add" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="add">Add</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {row.original.status === "isOnBarter" && (
          <Select onValueChange={(e) => handleChange(e)} >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Remove" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem  value="remove">Remove</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
    );
  }
    
    }
 
];
