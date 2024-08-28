import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Checkbox } from "~/components/ui/checkbox";
import { daysSince } from "~/lib/utils";

import { type WholePayment } from "~/schemas/payment";
import ColumnMenu from "./ColumnMenu";
import AmountCell from "~/app/reports/_components/table/AmountCell";
import AmounFooter from "~/app/reports/_components/table/AmounFooter";

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
