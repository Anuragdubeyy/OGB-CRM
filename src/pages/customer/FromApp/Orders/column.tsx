
import { ImageDomain, RowType } from '../../../../constant';

export const OrderColumn = [
  {
    accessorKey: 'user_name',
    header: 'Customer Name',
  },
  {
    accessorKey: 'ornament_name',
    header: 'Ornament Name',
  },
  {
    accessorKey: 'total_price',
    header: 'Price',
  },
  {
    accessorKey: 'gold_weight',
    header: 'Weight ',
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }: { row: RowType }) => (
      <div className="h-12 w-12 object-cover overflow-hidden mx-auto border rounded-md">
        <img
          className="object-cover h-full w-full"
          src={ImageDomain + "/" + row.getValue('image')}
          alt=""
        />
      </div>
    ),
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  
  {
    accessorKey: 'mobilenumber',
    header: 'Contact No.',
  },
  {
    accessorKey: 'update_at',
    header: 'Date',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  
  {
    accessorKey: 'name',
    header: 'Action',
  },
  ]
