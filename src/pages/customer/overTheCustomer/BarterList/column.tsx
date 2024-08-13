
import { ImageDomain, RowType } from '../../../../constant';

export const barterListColumn = [

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
    accessorKey: 'gold_weight',
    header: 'Weight',
  },
  {
    accessorKey: 'carat',
    header: 'Carat',
  },
  
  {
    accessorKey: 'created_at',
    header: 'Date',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  
  {
    accessorKey: 'owner details view ',
    header: 'Owner Details',
  },
  ]
