import { type Table } from "@tanstack/react-table";
import { type WholePayment } from "~/schemas/payment";
import { write, utils, writeFile } from "xlsx";
import { format } from "date-fns";

export const useXlsx = (table: Table<WholePayment>) => {
  const cols = table
    .getVisibleFlatColumns()
    .map((c) => {
      const header = c.columnDef.id;
      return header;
    })
    .filter((c) => c !== "select");

  const rows = table.getSelectedRowModel().rows.map((r) => {
    const pdfRow: Record<string, string | number> = {};
    cols.forEach((colId) => {
      if (colId) pdfRow[colId] = r.getValue(colId);
    });
    return pdfRow;
  });

  const dowloadXlsx = () => {
    const workSheet = utils.json_to_sheet(rows);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, "payments");

    write(workBook, { type: "buffer", bookType: "xlsx" });
    writeFile(
      workBook,
      `payments-${format(new Date(), "dd-MM-yyyy")}` + ".xlsx",
    );
  };

  return { dowloadXlsx };
};
