"use client";

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

import { type FC, useState } from "react";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

type CommandValue = {
  id: number;
  label: string;
  value: string;
};

interface ComboBoxProps {
  values: CommandValue[];
  name: string;
  fieldValue: number | null;
  onSelect: (id: number) => void;
}

const ComboBox: FC<ComboBoxProps> = ({
  values,
  name,
  fieldValue,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-sm font-normal"
        >
          {fieldValue
            ? values.find((st) => st.id === fieldValue)?.label
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
                  onSelect(c.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    fieldValue === c.id ? "opacity-100" : "opacity-0",
                  )}
                />
                {c.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;
