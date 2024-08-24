import { type Column } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { type FC } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { type WholePayment } from "~/schemas/payment";

interface VisibilityCheckProps {
  columns: Column<WholePayment>[];
}

const VisibilityCheck: FC<VisibilityCheckProps> = ({ columns }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Columns <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="grid grid-cols-3 gap-4">
        {columns.map((column) => {
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VisibilityCheck;
