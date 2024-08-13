
import { ImageDomain, RowType } from '../../../constant';

export const privilegeOrnamentsColumn = [
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
    accessorKey: 'date',
    header: 'Date',
  },

  {
    accessorKey: 'total_weight',
    header: ' Total Weight ',
  },
  
  {
    accessorKey: 'available_wright',
    header: 'Available Weight',
  },
  
  
  {
    accessorKey: 'total_price',
    header: 'Price  ',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },

  // {
  //   accessorKey: 'actions',
  //   header: 'Actions',
  //   cell: ({ row }: { row: RowType }) => {
  //     return (
  //       <Link to={`${row.getValue('_id')}`}>
  //         <Button variant="ghost">
  //           {/* <EyeIcon /> */}
  //           View Details
  //         </Button>
  //       </Link>
  //     );
  //   },
  // },
  
  
  ]
