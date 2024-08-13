
// import { Link } from 'react-router-dom';
import { ImageDomain, RowType } from '../../../../constant';
import { Button } from '../../../../components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../../../../components/ui/dialog';
import { AlertDialogHeader } from '../../../../components/ui/alert-dialog';
import { ViewPremiumStock } from '../../../../components/form/PremiumCollection/PremiumStock';
import { UploadPremiumImage } from '../../../../components/form/PremiumCollection/UplaodPremiumImage';
import { UploadPremiumVideo } from '../../../../components/form/PremiumCollection/UploadPremiumVideo';
import { useState } from 'react';
import ViewPremiumImage from '../../../../components/form/PremiumCollection/ViewPremiumImage';

export const premiumListColumn = [
    {
        accessorKey: 'ornament_id',
        header: 'Product ID',
      },
  {
    accessorKey: 'ornament_name',
    header: 'Ornament Name',
  },
  {
    accessorKey: 'image_paths',
    header: 'Ornament Image',
    cell: ({ row }: { row: RowType }) => (
      <div className="h-12 w-12 object-cover overflow-hidden mx-auto border rounded-md">
        <img
          className="object-cover h-full w-full"
          src={ImageDomain + "/" + row.getValue("image_paths")}
          alt=""
        />
      </div>
    ),
  },
  {
    accessorKey: 'width',
    header: 'Width ',
  },
  {
    accessorKey: 'height',
    header: 'Height  ',
  },

  {
    accessorKey: 'carat',
    header: ' Carat ',
  },
  
  {
    accessorKey: 'gold_weight',
    header: ' Gold Weight',
  },
  
  
  {
    accessorKey: 'other_stones',
    header: 'Other Stones',
  },
  {
    accessorKey: 'other_metals',
    header: 'Other Metals',
  },
  {
    accessorKey: 'other_charges',
    header: 'Charges',
  },
  {
    accessorKey: 'total_weight',
    header: 'Total Weight',
  },
  {
    accessorKey: 'total_price',
    header: 'Total Price',
  },
  {
    accessorKey: 'stock_count',
    header: 'stock',
  },
  {
    accessorKey: 'stock_count',
    header: 'Add Stock',
    cell: (
      { row }: { row: RowType }
      ) => {
        const [isDialogOpen, setIsDialogOpen] = useState(false);

      return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <Button className="w-14 font-medium text-xs text-center py-0.5 px-2 inline-flex bg-black items-center rounded  text-white   hover:scale-105 transition-all duration-100 ease-in-out "  >
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg  max-h-[82%]">
            <AlertDialogHeader className="">
              <DialogTitle>Add Premium Stock</DialogTitle>
              <ViewPremiumStock ornament={row.original} setIsDialogOpen={setIsDialogOpen}
                />
            </AlertDialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: 'ornament_id',
    header: 'Action',
    cell: (
      { row }: { row: RowType }
      ) => {
      return (
        <div className='flex gap-3'>
        <Dialog>
          <DialogTrigger>
            <Button className="font-medium text-xs text-center py-0.5 px-2 inline-flex bg-black items-center rounded  text-white   hover:scale-105 transition-all duration-100 ease-in-out " >
              Upload Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg 
           max-h-[82%]">
            <AlertDialogHeader className="">
              <DialogTitle>Upload Image</DialogTitle>
              <UploadPremiumImage premiumCollections={row.original}
                />
            </AlertDialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog>
          
          <DialogTrigger>
            <Button className="font-medium text-xs text-center py-0.5 px-2 inline-flex bg-black items-center rounded  text-white   hover:scale-105 transition-all duration-100 ease-in-out " >
              Upload Video
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl overflow-scroll max-h-[82%]">
            <AlertDialogHeader className="">
              <DialogTitle>Upload Video</DialogTitle>
              <UploadPremiumVideo agentId={row.original}
                />
            </AlertDialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger>
            <Button className="font-medium text-xs text-center py-0.5 px-2 inline-flex bg-black items-center rounded  text-white   hover:scale-105 transition-all duration-100 ease-in-out " >
              view Image
            </Button>
          </DialogTrigger>
          <DialogContent className="overflow-scroll  max-h-[80%]">
            <AlertDialogHeader className="">
              <DialogTitle>View Image</DialogTitle>
              <ViewPremiumImage ornamentId={row.getValue('ornament_id')}/>
            </AlertDialogHeader>
          </DialogContent>
        </Dialog>

        </div>
      );
    },
  },
  
];

  
  
  
