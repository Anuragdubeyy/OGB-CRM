
import { ImageDomain, RowType } from '../../../constant';

export const displayOrnamentColumn = [
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
    accessorKey: 'gold_weight',
    header: 'Weight',
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
    accessorKey: 'carat',
    header: 'Carat',
  },
  {
    accessorKey: 'height',
    header: 'Height',
  },
  
  {
    accessorKey: 'width',
    header: 'Width',
  },
  {
    accessorKey: 'other_stone',
    header: 'Other Stone',
  },
  {
    accessorKey: 'other_metal',
    header: 'Other Metals',
  },
  {
    accessorKey: 'other_charge',
    header: 'Other Charges',
  },
  ]
