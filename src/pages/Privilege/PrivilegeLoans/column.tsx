import { useState } from "react";
import { AddSettleLoan } from "../../../components/form/AddSettleLoans";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { ImageDomain, RowType } from "../../../constant";
import { ViewSettlements } from "./PrivilegeSettlemrnts/settlement";

export const privilegeLoanColumn = [
  {
    accessorKey: "user_name",
    header: "Customer Name",
  },
  {
    accessorKey: "user_image",
    header: "Customer Image",
    cell: ({ row }: { row: RowType }) => (
      <div className="h-12 w-12 object-cover overflow-hidden mx-auto border rounded-md">
        <img
          className="object-cover h-full w-full"
          src={ImageDomain + "/" + row.getValue("user_image")}
          alt=""
        />
      </div>
    ),
  },

  {
    accessorKey: "user_mobile",
    header: "Contact No.  ",
  },
  {
    accessorKey: "loan_amount",
    header: "Amount ",
  },

  {
    accessorKey: "settlements",
    header: "Settlements",
    cell: ({ row }: { row: RowType }) => {
      const settledAmount = row.original.settled_amount;
      console.log(settledAmount);
      

      return (
        <Dialog>
          <DialogTrigger>
            <p className="bg-primary text-white px-3 py-2 rounded-md text-sm hover:bg-primary/90 ">
              {settledAmount}{" "}
            </p>
          </DialogTrigger>
          <DialogContent className="max-h-[80%] max-w-[80%] overflow-scroll">
            <DialogHeader>
              <DialogTitle>All Privilege Ornament</DialogTitle>
            </DialogHeader>
            <ViewSettlements  />
          </DialogContent>
        </Dialog>
      );
    },
  },

  {
    accessorKey: "validity",
    header: "Validity",
  },

  {
    accessorKey: "day_left",
    header: "Day Left",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "upi_id",
    header: "Upi ID",
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },

  {
    accessorKey: "settle_loan",
    header: "Action ",

    cell: ({ row }: { row: RowType }) => {
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <p className="bg-primary text-white text-sm px-3 py-2 whitespace-nowrap rounded-md hover:bg-primary/90 ">
              settle Loan
            </p>
          </DialogTrigger>
          <DialogContent className="max-h-[50%] max-w-[50%] ">
            <DialogHeader>
              <DialogTitle>All Privilege Ornament</DialogTitle>
            </DialogHeader>

            <AddSettleLoan
              settleLoan={row.original}
              setIsDialogOpen={setIsDialogOpen}
            />
          </DialogContent>
        </Dialog>
      );
    },
  },
];
