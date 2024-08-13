
import { ImageDomain, RowType } from '../../../../constant';

export const homeColumn = [
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
    accessorKey: 'ornament_name',
    header: 'Ornament Name',
  },
  
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'gold_weight',
    header: 'Weight',
  },
  {
    accessorKey: 'user_name',
    header: 'Customer Name',
  },
  
  {
    accessorKey: 'mobilenumber',
    header: 'Mobile',
  },

  {
    accessorKey: 'status',
    header: 'Status',
  },
  ]
