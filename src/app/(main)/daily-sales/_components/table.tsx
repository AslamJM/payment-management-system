"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { paymentColumns } from "./columns";
import { useState } from "react";
import Loader from "~/components/common/Loader";
import { type WholePayment } from "~/schemas/payment";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useQueryParams } from "~/hooks/useQueryParams";
import { DataTablePagination } from "~/components/common/DataTablePagination";

type TableProps = {
  payments: WholePayment[];
  loading: boolean;
};

export default function PaymentTable({ payments, loading }: TableProps) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: payments,
    columns: paymentColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,

    state: {
      rowSelection,
    },
  });

  const where = useQueryParams((state) => state.where);
  const utils = api.useUtils();

  const verifyMutation = api.payment.verifyPayments.useMutation();

  const onVerify = () => {
    const selected = table
      .getFilteredSelectedRowModel()
      .rows.filter((row) => !row.original.verified)
      .map((row) => row.original.id);

    verifyMutation.mutate(selected, {
      onSuccess: (data) => {
        if (data.success) {
          utils.payment.all.setData({ where }, (old) => {
            return old?.map((p) =>
              selected.includes(p.id) ? { ...p, verified: true } : p,
            );
          });
        }
      },
    });
  };

  return (
    <div className="rounded-md border">
      <div className="flex-1 px-2 py-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
        <Button
          variant="ghost"
          size="sm"
          className="ml-2"
          disabled={
            table.getFilteredSelectedRowModel().rows.length === 0 ||
            verifyMutation.isPending
          }
          onClick={onVerify}
        >
          Verify Selected
        </Button>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={paymentColumns.length}
                  className="h-24 text-center"
                >
                  {loading ? <Loader /> : "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            {table.getFooterGroups().map((fg) => (
              <TableRow key={fg.id}>
                {fg.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableFooter>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
