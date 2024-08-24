import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { Checkbox } from "~/components/ui/checkbox";
import { daysSince } from "~/lib/utils";

import { type WholePayment } from "~/schemas/payment";
import { DataTableColumnHeader } from "./ReportsTableHeader";
import ShopSelect from "./filters/ShopSelect";

export const reportColumns: ColumnDef<WholePayment>[] = [
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
    header: (c) => <DataTableColumnHeader {...c} title="Payment Date" />,
    cell: ({ cell }) => format(cell.getValue<Date>(), "dd/MM/yyyy"),
  },
  {
    accessorKey: "invoice_number",
    header: "Invoice",
  },
  {
    accessorKey: "shop",
    accessorFn: (row) => row.shop.name,
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader title="Shop" column={column} />
        <ShopSelect column={column} />
      </div>
    ),
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
  },
  {
    accessorKey: "paid",
    header: "Paid",
  },
  {
    accessorKey: "free",
    header: "Free",
  },
  {
    accessorKey: "discount",
    header: "Discount",
  },
  {
    accessorKey: "saleable_return",
    header: "Saleable",
  },
  {
    accessorKey: "market_return",
    header: "Market",
  },
  {
    accessorKey: "due",
    header: "Due",
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
    cell: ({ row }) => daysSince(row.original.payment_date) + " days",
  },
];
