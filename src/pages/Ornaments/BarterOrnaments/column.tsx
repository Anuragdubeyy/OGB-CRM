
import { Link } from 'react-router-dom';
import { RowType } from '../../../constant';
import { Button } from '../../../components/ui/button';

export const barterOrnamentColumn = [
  {
    accessorKey: 'name',
    header: 'Ornament Name',
  },
  {
    accessorKey: 'id',
    header: 'Ornament Image',
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
    header: 'Customer Name  ',
  },
  {
    accessorKey: 'name',
    header: 'Contact No.  ',
  },

  {
    accessorKey: 'name',
    header: ' Date  ',
  },
  
  {
    accessorKey: 'name',
    header: 'Weight',
  },
  
  
  {
    accessorKey: 'name',
    header: 'Price  ',
  },
  {
    accessorKey: 'name',
    header: 'Category',
  },
  {
    accessorKey: 'name',
    header: 'Status',
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }: { row: RowType }) => {
      return (
        <Link to={`${row.getValue('_id')}`}>
          <Button variant="ghost">
            {/* <EyeIcon /> */}
            View Details
          </Button>
        </Link>
      );
    },
  },
  
  
  ]
