import { type Column } from "@tanstack/react-table";
import { type FC, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { useValues } from "~/hooks/useValues";
import { type WholePayment } from "~/schemas/payment";
import { Button } from "~/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

interface FilterComboBoxProps {
  column: Column<WholePayment>;
  item: "area" | "shop" | "company" | "collector";
}

const FilterComboBox: FC<FilterComboBoxProps> = ({ column, item }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const { collectorValues, shopValues, regionValues, companyValues } =
    useValues();
  let values = [
    {
      id: 0,
      value: "",
      label: "all",
    },
  ];

  switch (item) {
    case "area":
      values = [...values, ...regionValues];
      break;
    case "collector":
      values = [...values, ...collectorValues];
      break;
    case "company":
      values = [...values, ...companyValues];
      break;
    case "shop":
      values = [...values, ...shopValues];
      break;
  }

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between text-sm font-normal"
          >
            {selected ? selected : `${item}...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder={`Search ${item}...`} />
            <CommandList>
              <CommandEmpty>No {item} found.</CommandEmpty>

              {values.map((c) => (
                <CommandItem
                  key={c.value}
                  value={c.value}
                  onSelect={() => {
                    setSelected(c.value);
                    column.setFilterValue(c.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected === c.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {c.label}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterComboBox;
