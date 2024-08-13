
import UpdateDepositOrnamentsForm from '../../../components/form/Ornaments/UpdateDepositOrnaments';
import ViewDepositOrnamentImage from '../../../components/form/Ornaments/viewDepositOrnaments';
import { Button } from '../../../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog';
import { ImageDomain, RowType } from '../../../constant';
// import { ViewDepositOrnamentImage } from '../../components/form/viewDepositOrnaments';

export const depositeOrnamentColumn = [
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
    accessorKey: 'deposit_date',
    header: 'Deposit Date  ',
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
    accessorKey: 'category',
    header: 'Category',
  },
  
  {
    accessorKey: 'ornament_id',
    header: 'Actions',
    cell: ({ row }: { row: RowType }) => {
      // console.log(row.original)
      return (
        <div className='flex gap-2'>
        <Dialog>
            <DialogTrigger asChild>
              <Button className="font-medium text-xs text-center py-0.5 px-2 cursor-pointer inline-flex bg-black items-center rounded  text-white   hover:scale-105 transition-all duration-100 ease-in-out ">
                {/* <RiEditBoxLine size={25} /> */}
                Update Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80%] overflow-scroll">
              <DialogHeader>
                <DialogTitle>Edit Offer</DialogTitle>
                <DialogDescription>
                  Make changes to your Offer here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>

              <UpdateDepositOrnamentsForm depositOrnaments={row.original} />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="font-medium text-xs text-center py-0.5 px-2 inline-flex bg-black items-center rounded  text-white  hover:scale-105 transition-all duration-100 ease-in-out ">
                {/* <RiEditBoxLine size={25} /> */}
                View Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80%] overflow-scroll ">
              <DialogHeader>
                <DialogTitle>View All Images</DialogTitle>
                <DialogDescription>
                  Make changes to your Offer here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>

              <ViewDepositOrnamentImage ornamentId={row.getValue('ornament_id')} />
            </DialogContent>
          </Dialog>
          
        
        </div>
        

      );
    },
  },
  ]
