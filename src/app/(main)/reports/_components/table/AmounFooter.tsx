import { type Table } from "@tanstack/react-table";
import { type FC } from "react";
import { rupees } from "~/lib/utils";
import { type WholePayment } from "~/schemas/payment";

interface AmounFooterProps {
  table: Table<WholePayment>;
  colId: string;
}

const AmounFooter: FC<AmounFooterProps> = ({ table, colId }) => {
  const total = table
    .getRowModel()
    .rows.reduce((a, r) => Number(r.getValue(colId)) + a, 0);

  return <div className="text-right">{rupees(total)}</div>;
};

export default AmounFooter;
