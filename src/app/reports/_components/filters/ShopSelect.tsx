import { type Column } from "@tanstack/react-table";
import { useMemo, type FC } from "react";
import { type WholePayment } from "~/schemas/payment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "~/components/ui/select";
import { api } from "~/trpc/react";

interface ShopSelectProps {
  column: Column<WholePayment>;
}

const ShopSelect: FC<ShopSelectProps> = ({ column }) => {
  const { data } = api.shops.all.useQuery();
  const shopNames = useMemo(() => {
    if (data) {
      return data.map((d) => d.name);
    }
    return [];
  }, [data]);
  return (
    <Select onValueChange={(v) => column.setFilterValue(v)}>
      <SelectTrigger>Filter Shops</SelectTrigger>
      <SelectContent>
        {shopNames.map((sn) => (
          <SelectItem key={sn} value={sn}>
            {sn}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ShopSelect;
