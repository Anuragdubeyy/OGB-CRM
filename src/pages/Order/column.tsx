
import { Link } from 'react-router-dom';
import { ImageDomain, RowType } from '../../constant';
import { Button } from '../../components/ui/button';

export const byOrderColumn = [
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
    accessorKey: 'ornament_category',
    header: 'Ornament Category',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },

  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }: { row: RowType }) => {
      return (
        <Link to={`${row.getValue('_id')}`}>
          <Button variant="ghost">
            {/* <EyeIcon /> */}
            Delivered
          </Button>
        </Link>
      );
    },
  },
  
  
  ]
