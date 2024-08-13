
import {  ViewPrivilegeUser } from '../../../components/form/PrivilegeOrnaments/PrivilegeOrnaments';
import { Button } from '../../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog';
import { ImageDomain, RowType } from '../../../constant';
import image from '../../../assets/faces/img_avatar.png';


export const privilegeMemberColumn = [
  {
    accessorKey: 'user_name',
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
    accessorKey: 'user_email',
    header: 'Customer Email',
  },
  {
    accessorKey: 'user_mobile',
    header: 'Contact No.  ',
  },

  {
    accessorKey: 'privilege_ornaments',
    header: 'Privilege Ornament',
    cell: (
      { row }: { row: RowType }
      ) => {
        console.log(row.original)

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary text-white text-sm hover:bg-primary/90 " >
              {row.getValue('cases')}
              View
              
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80%] max-w-[80%] overflow-scroll">
            <DialogHeader>
              <DialogTitle>All Privilege Ornament</DialogTitle>
            </DialogHeader>

            <ViewPrivilegeUser privilege={row.original}  />
          </DialogContent>
        </Dialog>
      );
    },
  },


  {
    accessorKey: 'weight',
    header: 'Weight',
  },
  
  
  {
    accessorKey: 'barter_ornament',
    header: 'Batered Ornaments',
  },
  {
    accessorKey: 'barter_weight',
    header: 'Bartered Weight',
  },
  
  ]
