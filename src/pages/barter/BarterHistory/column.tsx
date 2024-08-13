
import { ImageDomain, RowType } from '../../../constant';

export const barterHistoryColumn = [
  
  {
    accessorKey: 'ornament_name',
    header: 'Ornament Name',
  },
  {
    accessorKey: 'image',
    header: 'Image',
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
    header: 'Weight(gm)',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'barterer_name',
    header: 'Barter Name',
  },
  {
    accessorKey: 'barterer_mobile',
    header: 'Contact no.',
  },
  {
    accessorKey: 'barterer_email',
    header: 'Email',
  },
  
  
  {
    accessorKey: 'barterer_address',
    header: 'Address',
  },

  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'owner_details',
    header: 'Owner Details',
  }

  ]
