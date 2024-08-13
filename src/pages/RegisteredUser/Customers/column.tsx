
import { ImageDomain, RowType } from '../../../constant';
import image from '../../../assets/faces/img_avatar.png';
export const customerColumn = [
 
  {
    accessorKey: 'name',
    header: 'Customer Name',
  },
  {
    accessorKey: 'profileImage',
    header: 'Customer Image',
    cell: ({ row }: { row: RowType }) => {
      const profileImageSrc = row.getValue('profileImage');
      
      return (
        <div className="h-12 w-12 object-cover overflow-hidden mx-auto border rounded-md">
          {profileImageSrc ? (
            <img
              className="object-cover h-full w-full"
              src={ImageDomain + "/" + profileImageSrc}
              alt=""
            />
          ) : (
            <img
              className="object-cover h-full w-full"
              src={image}
              alt=""
            />
          )}
        </div>
      );
    },
  },
  
  
  
  {
    accessorKey: 'email',
    header: 'Customer Email',
  },
  {
    accessorKey: 'phone',
    header: 'Contact No.',
  },
  {
    accessorKey: 'isBarter',
    header: 'Barter Membership',
  },
  {
    accessorKey: 'barterWeight',
    header: 'Barter Limit ',
  },
  
  {
    accessorKey: 'privilege_weight',
    header: 'Privilege Weight ',
  },
  {
    accessorKey: 'total_weight',
    header: 'Total Weight ',
  },

  

]