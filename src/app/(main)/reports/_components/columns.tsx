import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Checkbox } from "~/components/ui/checkbox";
import { cn, daysSince } from "~/lib/utils";

import { type WholePayment } from "~/schemas/payment";
import { DataTableColumnHeader } from "./ReportsTableHeader";
import TextFilter from "./filters/TextFilter";
import FilterComboBox from "~/app/(main)/_components/reports/FilterComboBox";
import AmountCell from "./table/AmountCell";
import { Badge } from "~/components/ui/badge";
import { type PaymentStatus } from "@prisma/client";
import AmounFooter from "./table/AmounFooter";
import StatusSelect from "./filters/ShopSelect";
import InvoiceColumn from "./table/InvoiceColumn";

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
    id: "Invoice Date",
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
    id: "Invoice",
    header: (c) => (
      <div className="w-[100px] space-y-1 py-1">
        <DataTableColumnHeader {...c} title="Invoice" />
        <TextFilter column={c.column} name="invoice" />
      </div>
    ),
    cell: (c) => (
      <InvoiceColumn
        invoice={c.getValue() as string}
        paymentId={c.row.original.id}
        amount={c.row.original.total}
      />
    ),
  },
  {
    id: "Shop",
    accessorKey: "shop.name",
    header: ({ column }) => (
      <div className="space-y-1  py-1">
        <DataTableColumnHeader title="Shop" column={column} />
        <FilterComboBox column={column} item="shop" />
      </div>
    ),
  },
  {
    id: "Company",
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
    id: "Area",
    header: ({ column }) => (
      <div className="space-y-1 py-1">
        <DataTableColumnHeader title="Area" column={column} />
        <FilterComboBox column={column} item="area" />
      </div>
    ),
  },
  {
    accessorKey: "total",
    id: "total",
    header: "Total",
    size: 100,
    cell: (r) => <AmountCell amount={r.getValue() as number} />,
    footer: ({ table }) => <AmounFooter table={table} colId="total" />,
  },
  {
    accessorKey: "paid",
    header: "Paid",
    id: "paid",
    size: 100,
    cell: (r) => <AmountCell amount={r.getValue() as number} />,
    footer: ({ table }) => <AmounFooter table={table} colId="paid" />,
  },
  {
    accessorKey: "due",
    header: "Due",
    id: "due",
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
    id: "Due Date",
    accessorFn: (row) => daysSince(row.due_date) + " days",
  },
  {
    accessorKey: "free",
    header: "Free",
    id: "free",
    size: 100,
    cell: (r) => <AmountCell amount={r.getValue() as number} />,
    footer: ({ table }) => <AmounFooter table={table} colId="free" />,
  },
  {
    accessorKey: "discount",
    header: "Discount",
    id: "discount",
    size: 100,
    cell: (r) => <AmountCell amount={r.getValue() as number} />,
    footer: ({ table }) => <AmounFooter table={table} colId="discount" />,
  },
  {
    accessorKey: "saleable_return",
    header: "Saleable",
    id: "saleable",
    size: 100,
    cell: (r) => <AmountCell amount={r.getValue() as number} />,
    footer: ({ table }) => <AmounFooter table={table} colId="saleable" />,
  },
  {
    accessorKey: "market_return",
    header: "Market",
    id: "market",
    size: 100,
    cell: (r) => <AmountCell amount={r.getValue() as number} />,
    footer: ({ table }) => <AmounFooter table={table} colId="market" />,
  },

  {
    accessorKey: "payment_status",
    id: "Status",
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
    id: "Collector",
    header: ({ column }) => (
      <div className="space-y-1  py-1">
        <DataTableColumnHeader title="Collector" column={column} />
        <FilterComboBox column={column} item="collector" />
      </div>
    ),
  },
];
