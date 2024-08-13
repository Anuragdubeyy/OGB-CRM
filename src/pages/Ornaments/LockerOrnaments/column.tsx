
import { ImageDomain, RowType } from '../../../constant';

export const lockerOrnamentColumn = [
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
          src={ImageDomain + "/" + row.getValue("image")}
          alt=""
        />
      </div>
    ),
  },
  {
    accessorKey: 'user_name',
    header: 'Customer Name  ',
  },
  {
    accessorKey: 'user_mobile',
    header: 'Contact No.  ',
  },
  {
    accessorKey: 'locker_number',
    header: 'Locker Number',
  },

  {
    accessorKey: 'withdraw_date',
    header: 'withdraw Date  ',
  },
  {
    accessorKey: 'carat',
    header: 'carat ',
  },
  
  {
    accessorKey: 'gold_weight',
    header: 'Weight',
  },
  
  
  {
    accessorKey: 'height',
    header: 'height ',
  },
  {
    accessorKey: 'width',
    header: 'width',
  },
  {
    accessorKey: 'total_price',
    header: 'Price  ',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'other_stone',
    header: 'Other Stone',
  },
  {
    accessorKey: 'other_metal',
    header: 'Other Metal',
  },
  {
    accessorKey: 'other_charge',
    header: 'Other Charge',
  },
 
 
  
  
  ]
