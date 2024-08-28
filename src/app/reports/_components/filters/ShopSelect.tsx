import { type Column } from "@tanstack/react-table";
import { type FC } from "react";
import { type WholePayment } from "~/schemas/payment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "~/components/ui/select";

interface StatusSelectProps {
  column: Column<WholePayment>;
}

const StatusSelect: FC<StatusSelectProps> = ({ column }) => {
  const status = ["PAID", "DUE", "CANCELLED"];

  return (
    <Select
      onValueChange={(v) => {
        v === "all" ? column.setFilterValue("") : column.setFilterValue(v);
      }}
    >
      <SelectTrigger>Status</SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {status.map((sn) => (
          <SelectItem key={sn} value={sn}>
            {sn.toLowerCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusSelect;
