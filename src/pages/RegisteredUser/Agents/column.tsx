
import { RowType } from '../../../constant';

export const agentDetailsColumn = [
 
  {
    accessorKey: 'name',
    header: 'Agent Name',
  },
  {
    accessorKey: 'id',
    header: 'Agent Image',
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
    accessorKey: 'name',
    header: 'Agent Email',
  },
  {
    accessorKey: 'name',
    header: 'Contact No.',
  },
  {
    accessorKey: 'name',
    header: 'View  ',
  },

]