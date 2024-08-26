import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Checkbox } from "~/components/ui/checkbox";
import { daysSince } from "~/lib/utils";

import { type WholePayment } from "~/schemas/payment";
import { DataTableColumnHeader } from "./ReportsTableHeader";
import TextFilter from "./filters/TextFilter";
import FilterComboBox from "~/app/_components/reports/FilterComboBox";

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
    accessorFn: (row) => format(row.payment_date, "dd/MM/yyyy"),
    header: (c) => (
      <div className="w-[100px] space-y-1 py-1">
        <DataTableColumnHeader {...c} title="Invoice Date" />
        <TextFilter column={c.column} name="date" />
      </div>
    ),
  },
  {
    accessorKey: "invoice_number",
    header: (c) => (
      <div className="w-[100px] space-y-1 py-1">
        <DataTableColumnHeader {...c} title="Invoice" />
        <TextFilter column={c.column} name="invoice" />
      </div>
    ),
  },
  {
    id: "shop",
    accessorKey: "shop.name",
    header: ({ column }) => (
      <div className="space-y-1  py-1">
        <DataTableColumnHeader title="Shop" column={column} />
        <FilterComboBox column={column} item="shop" />
      </div>
    ),
  },
  {
    id: "company",
    accessorKey: "company.name",
    header: ({ column }) => (
      <div className="space-y-1 py-1">
        <DataTableColumnHeader title="Company" column={column} />
        <FilterComboBox column={column} item="company" />
      </div>
    ),
  },
  {
    accessorKey: "shop.region.name",
    id: "area",
    header: ({ column }) => (
      <div className="space-y-1 py-1">
        <DataTableColumnHeader title="Area" column={column} />
        <FilterComboBox column={column} item="area" />
      </div>
    ),
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
    accessorKey: "due",
    header: "Due",
  },
  {
    header: (c) => (
      <div className=" space-y-1 py-1">
        <DataTableColumnHeader {...c} title="Credit Period" />
        <TextFilter column={c.column} name="period" />
      </div>
    ),
    accessorKey: "due_date",
    accessorFn: (row) => daysSince(row.due_date) + " days",
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
    accessorKey: "payment_status",
    header: "Status",
  },
  {
    accessorKey: "collector.name",
    header: ({ column }) => (
      <div className="space-y-1  py-1">
        <DataTableColumnHeader title="Collector" column={column} />
        <FilterComboBox column={column} item="collector" />
      </div>
    ),
  },
];
