import { type Column } from "@tanstack/react-table";
import { type FC } from "react";
import { Input } from "~/components/ui/input";
import { type WholePayment } from "~/schemas/payment";

interface TextFilterProps {
  column: Column<WholePayment>;
  name: string;
}

const TextFilter: FC<TextFilterProps> = ({ column, name }) => {
  return (
    <div>
      <Input
        className="font-normal text-muted-foreground"
        placeholder={`Filter ${name}`}
        onChange={(e) => column.setFilterValue(e.target.value)}
      />
    </div>
  );
};

export default TextFilter;
