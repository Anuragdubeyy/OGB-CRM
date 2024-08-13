import {  ImageDomain, RowType } from "../../../constant";

export const barterAvailableColumn = [
  {
    accessorKey: "ornament_id",
    header: "Product ID",
  },
  {
    accessorKey: "ornament_name",
    header: "Ornament Name",
  },
  {
    accessorKey: "image",
    header: "Image",
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
    accessorKey: "total_price",
    header: "Price (Rs)",
  },
  {
    accessorKey: "user_name",
    header: "Customer Name",
  },
  {
    accessorKey: "user_mobile",
    header: "Mobile",
  },
  {
    accessorKey: "name",
    header: "Weight(gm)",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "carat",
    header: "Carat",
  },
  {
    accessorKey: "height",
    header: "Height",
  },
  {
    accessorKey: "width",
    header: "Width",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
