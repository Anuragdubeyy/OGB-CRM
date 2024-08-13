
import { ImageDomain, RowType } from '../../../constant';

export const soldOrnamentColumn = [
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
    accessorKey: 'making_changes',
    header: 'Making Changes',
  },
  {
    accessorKey: 'other_charge',
    header: 'Extra Amount',
  },
  
  {
    accessorKey: 'sold',
    header: 'Sold By',
  },
  ]
