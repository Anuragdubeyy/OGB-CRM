import { useEffect, useState } from "react";
import WithdrawOrnamentsForm from "../../../../components/form/customer/overTheCustomer/withdrawOrnamentForm";
import { Button } from "../../../../components/ui/button";
import {
    Dialog,
    DialogContent,
    
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../../components/ui/dialog";
import { ImageDomain, RowType } from "../../../../constant";
import { useAppDispatch, useAppSelector } from "../../../../store/Hooks";
import { getCustomerOtcWithdrawListAsync } from "../../../../store/slices/CustomerOtcWithdraw";
import {
    getCheckUserListAsync,
    selectCheckUserId,
    selectCheckUserMobile,
} from "../../../../store/slices/userCheck";
// import { useNavigate } from "react-router-dom";
import { getCustomerOtp } from "../../../../store/api/Customer/CustomerOTP";

export const withdrawColumn = [
  {
    accessorKey: "ornament_name",
    header: "Ornament Name",
  },
  {
    accessorKey: "image",
    header: "Ornament Image",
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
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "total_price",
    header: "Price  ",
  },
  {
    accessorKey: "gold_weight",
    header: "Weight",
  },
  {
    accessorKey: "width",
    header: "width",
  },

  {
    accessorKey: "height",
    header: "Height",
  },

  {
    accessorKey: "name",
    header: "Action",
    cell: ({ row }: { row: RowType }) => {
      console.log(row.original);
      const checkUserMobile = useAppSelector(selectCheckUserMobile);
      const checkUserId = useAppSelector(selectCheckUserId);
      const dispatch = useAppDispatch();

      const [isLoading, setIsLoading] = useState(false);


      const handleWithdrawButtonClick = async () => {
        try {
          setIsLoading(true);
        await getCustomerOtp(checkUserMobile);
          
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      };

      useEffect(() => {
        dispatch(getCheckUserListAsync(checkUserMobile));
      }, [dispatch, checkUserMobile]);

      useEffect(() => {
        dispatch(getCustomerOtcWithdrawListAsync(checkUserId));
      }, [dispatch, checkUserId]);


      return (
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                        disabled={isLoading}
                onClick={handleWithdrawButtonClick}
                className="font-medium text-xs text-center py-0.5 px-2 cursor-pointer inline-flex bg-black items-center rounded  text-white   hover:scale-105 transition-all duration-100 ease-in-out "
              >
                withdraw
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80%] ">
              <DialogHeader>
                <DialogTitle>Withdraw Ornaments</DialogTitle>
                
              </DialogHeader>

              <WithdrawOrnamentsForm
              ornament_id={row.original.ornament_id}
              />
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
