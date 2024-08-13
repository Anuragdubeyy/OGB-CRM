
import { RowType } from '../../../constant';

export const lockerManagerColumn = [
 
  {
    accessorKey: 'name',
    header: 'Manager Name',
  },
  {
    accessorKey: 'id',
    header: 'Manager Image',
    cell: ({ row }: { row: RowType }) => (
      <div className="h-12 w-12 object-cover overflow-hidden mx-auto border rounded-md">
        <img
          className="object-cover h-full w-full"
          src={row.getValue('image')}
          alt=""
        />
      </div>
    ),
  },
  {
    accessorKey: 'locker_number',
    header: 'Locker Number',
  },
  
  {
    accessorKey: 'name',
    header: 'Manager Email',
  },
  {
    accessorKey: 'phone',
    header: 'Contact No.',
  },
  {
    accessorKey: 'date_of_allocation',
    header: 'Date Of Allocation',
  },
  // {
  //   accessorKey: 'name',
  //   header: 'View  ',
  // },

]