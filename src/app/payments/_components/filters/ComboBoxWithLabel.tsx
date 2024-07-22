import { Label } from "~/components/ui/label";
import { Check, ChevronsUpDown } from "lucide-react";
import { type FC, useState } from "react";
import { Button } from "~/components/ui/button";

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
import { type Key, useQueryParams } from "~/hooks/useQueryParams";
import { cn } from "~/lib/utils";

type CommandValue = {
  id: number;
  label: string;
  value: string;
};

interface ComboBoxWithLabelProps {
  name: string;
  objectKey: Key;
  values: CommandValue[];
}

const ComboBoxWithLabel: FC<ComboBoxWithLabelProps> = ({
  name,
  objectKey,
  values,
}) => {
  const [open, setOpen] = useState(false);
  const where = useQueryParams((state) => state.where);
  let value = where[objectKey];

  if (objectKey === "shop") {
    value = where[objectKey]?.region_id;
  }

  const addParams = useQueryParams((state) => state.addParam);

  return (
    <div className="space-y-1">
      <Label className="text-sm font-medium leading-none">{name}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-sm font-normal"
          >
            {value
              ? values.find((st) => st.id === value)?.label
              : `Select ${name}...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder={`Search ${name}...`} />
            <CommandList>
              <CommandEmpty>No {name} found.</CommandEmpty>

              {values.map((c) => (
                <CommandItem
                  key={c.value}
                  value={c.value}
                  onSelect={() => {
                    if (objectKey === "shop") {
                      addParams("shop", { region_id: c.id });
                    } else {
                      addParams(objectKey, c.id);
                    }
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === c.id ? "opacity-100" : "opacity-0",
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

export default ComboBoxWithLabel;
