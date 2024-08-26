import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Checkbox } from "~/components/ui/checkbox";
import { daysSince, rupees } from "~/lib/utils";

import { type WholePayment } from "~/schemas/payment";
import ColumnMenu from "./ColumnMenu";

export const paymentColumns: ColumnDef<WholePayment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "payment_date",
    header: "Invoice Date",
    cell: ({ cell }) => format(cell.getValue<Date>(), "dd/MM/yyyy"),
  },
  {
    accessorKey: "invoice_number",
    header: "Invoice",
  },
  {
    accessorKey: "shop",
    accessorFn: (row) => row.shop.name,
    header: "Shop",
  },
  {
    accessorKey: "company",
    accessorFn: (row) => row.company.name,
    header: "Company",
  },
  {
    accessorKey: "shop",
    accessorFn: (row) => row.shop.region.name,
    id: "area",
    header: "Area",
  },
  {
    accessorKey: "total",
    header: "Total",
    accessorFn: (row) => rupees(row.total),
  },
  {
    accessorKey: "paid",
    header: "Paid",
    accessorFn: (row) => rupees(row.paid),
  },
  {
    accessorKey: "free",
    header: "Free",
    accessorFn: (row) => rupees(row.free),
  },
  {
    accessorKey: "discount",
    header: "Discount",
    accessorFn: (row) => rupees(row.discount),
  },
  {
    accessorKey: "saleable_return",
    header: "Saleable",
    accessorFn: (row) => rupees(row.saleable_return),
  },
  {
    accessorKey: "market_return",
    header: "Market",
    accessorFn: (row) => rupees(row.market_return),
  },
  {
    accessorKey: "due",
    header: "Due",
    accessorFn: (row) => rupees(row.due),
  },
  {
    accessorKey: "payment_status",
    header: "Status",
  },
  {
    accessorKey: "collector",
    accessorFn: (row) => row.collector.name,
    header: "Collector",
  },

  {
    header: "Credit Period",
    accessorFn: (row) => row.payment_date,
    cell: ({ row }) => daysSince(row.original.due_date) + " days",
  },
  {
    id: "Action",
    cell: ({ row }) => <ColumnMenu payment={row.original} />,
  },
];
