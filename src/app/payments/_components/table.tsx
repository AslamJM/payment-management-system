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
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { paymentColumns } from "./columns";
import { useState } from "react";
import Loader from "~/components/common/Loader";
import { type WholePayment } from "~/schemas/payment";

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

  return (
    <div className="rounded-md border">
      <Table>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
      </Table>
    </div>
  );
}
