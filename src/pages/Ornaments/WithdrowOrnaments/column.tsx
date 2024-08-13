
import { ImageDomain, RowType } from '../../../constant';

export const withdrowOrnamentColumn = [
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
    accessorKey: 'date',
    header: ' Date  ',
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
  
  
  ]
