import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Checkbox } from "~/components/ui/checkbox";
import { cn, daysSince } from "~/lib/utils";

import { type WholePayment } from "~/schemas/payment";
import { DataTableColumnHeader } from "./ReportsTableHeader";
import TextFilter from "./filters/TextFilter";
import FilterComboBox from "~/app/_components/reports/FilterComboBox";
import AmountCell from "./table/AmountCell";
import { Badge } from "~/components/ui/badge";
import { PaymentStatus } from "@prisma/client";
import AmounFooter from "./table/AmounFooter";
import StatusSelect from "./filters/ShopSelect";

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
    size: 100,
    cell: (r) => <AmountCell amount={r.getValue() as number} />,
    footer: ({ table }) => <AmounFooter table={table} colId="total" />,
  },
  {
    accessorKey: "paid",
    header: "Paid",
    size: 100,
    cell: (r) => <AmountCell amount={r.getValue() as number} />,
    footer: ({ table }) => <AmounFooter table={table} colId="paid" />,
  },
  {
    accessorKey: "due",
    header: "Due",
    size: 100,
    cell: (r) => <AmountCell amount={r.getValue() as number} />,
    footer: ({ table }) => <AmounFooter table={table} colId="due" />,
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
    size: 100,
    cell: (r) => <AmountCell amount={r.getValue() as number} />,
    footer: ({ table }) => <AmounFooter table={table} colId="free" />,
  },
  {
    accessorKey: "discount",
    header: "Discount",
    size: 100,
    cell: (r) => <AmountCell amount={r.getValue() as number} />,
    footer: ({ table }) => <AmounFooter table={table} colId="discount" />,
  },
  {
    accessorKey: "saleable_return",
    header: "Saleable",
    size: 100,
    cell: (r) => <AmountCell amount={r.getValue() as number} />,
    footer: ({ table }) => (
      <AmounFooter table={table} colId="saleable_return" />
    ),
  },
  {
    accessorKey: "market_return",
    header: "Market",
    size: 100,
    cell: (r) => <AmountCell amount={r.getValue() as number} />,
    footer: ({ table }) => <AmounFooter table={table} colId="market_return" />,
  },

  {
    accessorKey: "payment_status",
    header: ({ column }) => (
      <div className="space-y-1  py-1">
        <DataTableColumnHeader title="Status" column={column} />
        <StatusSelect column={column} />
      </div>
    ),
    cell: ({ getValue }) => (
      <Badge
        className={`${cn(getValue() === "PAID" ? "bg-green-500" : "bg-red-500")}`}
      >
        {getValue() as PaymentStatus}
      </Badge>
    ),
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
