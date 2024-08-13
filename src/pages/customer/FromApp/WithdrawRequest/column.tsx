// import { RowType } from '../../../../constant';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";
import { Button } from "../../../../components/ui/button";
import { RowType } from "../../../../constant";
import { useAppDispatch, useAppSelector } from "../../../../store/Hooks";
import { getCustomerWithdrawRequestAsync} from "../../../../store/slices/customerWithdraw";
import { selectCheckUserId } from "../../../../store/slices/userCheck";

export const withdrawRequestColumn = [
  {
    accessorKey: "user_name",
    header: "Customer Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },

  {
    accessorKey: "user_phone",
    header: "Contact No.",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Time",
  },

  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "request_type",
    header: "Request Type",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }: { row: RowType }) => {
      console.log(row.original);
      const dispatch = useAppDispatch();
      const checkUserId = useAppSelector(selectCheckUserId);
      const ornament_id = row.original.ornament_id// Get the ornament_id from the row
      // console.log(checkUserId);
// console.log(ornament_id);
const handleConfirmClick = () => {
  dispatch(getCustomerWithdrawRequestAsync({ user_id: checkUserId, ornament_id }));
};
      return (
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Withdraw</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>
                Are you sure want to withdraw ornaments?
              </AlertDialogTitle>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={handleConfirmClick}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {/* <Button>Withdraw</Button> */}
        </div>
      );
    },
  },
];
