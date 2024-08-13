
import { ImageDomain, RowType } from '../../../../constant';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

export const displayColumn = [

  {
    accessorKey: 'ornament_name',
    header: 'Ornament Name',
  },
  {
    accessorKey: 'image',
    header: 'Ornament Image',
    cell: ({ row }: { row: RowType }) => (
      <div className="h-12 w-12 object-cover overflow-hidden mx-auto border rounded-md">
        <img
          className="object-cover h-full w-full"
          src= {ImageDomain + "/" + row.getValue('image')}
          alt=""
        />
      </div>
    ),
  },
  
  
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'total_price',
    header: 'price',
  },
  {
    accessorKey: 'weight',
    header: 'Weight',
  },
  {
    accessorKey: 'width',
    header: 'Width',
  },
  
  {
    accessorKey: 'height',
    header: 'Height',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  
  {
    accessorKey: 'name',
    header: 'Action',
    cell: ({ row }: { row: RowType }) => {
      console.log(row.original)
      
      return (
        <div className='flex gap-2'>
          <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Remove" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="remove">Remove</SelectItem>
          <SelectItem value="add">Sell</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
        
          </div>
      );
    }

  },
  ]
