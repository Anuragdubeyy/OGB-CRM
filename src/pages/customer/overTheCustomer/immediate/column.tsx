
import { ImageDomain, RowType } from '../../../../constant';

export const immediateColumn = [
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
  
  ]
