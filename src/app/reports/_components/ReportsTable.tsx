import {
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type VisibilityState,
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
import { useState, type FC } from "react";
import { type WholePayment } from "~/schemas/payment";
import { reportColumns } from "./columns";
import VisibilityCheck from "./filters/VisibilityCheck";
import { usePdf } from "~/hooks/usePdf";
import { Button } from "~/components/ui/button";
import { PrinterIcon, TableIcon } from "lucide-react";
import { useXlsx } from "~/hooks/useXlsx";
import { DataTablePagination } from "~/components/common/DataTablePagination";

interface ReportsTableProps {
  data: WholePayment[];
}

const ReportsTable: FC<ReportsTableProps> = ({ data }) => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns: reportColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      rowSelection,
      columnVisibility,
      columnFilters,
    },
  });

  const { modelData } = usePdf(table);
  const { dowloadXlsx } = useXlsx(table);

  const selectedLength = table.getSelectedRowModel().rows.length;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4 py-2">
        <div>
          <VisibilityCheck
            columns={table.getAllColumns().filter((c) => c.getCanHide())}
          />
        </div>
        <div>
          <Button onClick={modelData} disabled={selectedLength === 0}>
            <PrinterIcon className="mr-2" /> Download PDF
          </Button>
        </div>
        <div>
          <Button onClick={dowloadXlsx} disabled={selectedLength === 0}>
            <TableIcon className="mr-2" /> Download XLSX
          </Button>
        </div>
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
            {table.getRowModel().rows.map((row) => (
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
            ))}
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
      <div className="md:w-[550px]">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};

export default ReportsTable;
