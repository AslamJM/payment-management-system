"use client";

import CardWrapper from "~/components/common/CardWrapper";
import { useValues } from "~/hooks/useValues";

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
import { useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "~/lib/utils";

const ShopSearch = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | null>(null);

  const { shopValues } = useValues();
  return (
    <CardWrapper title="Shop Search">
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-1/2 justify-between text-sm font-normal"
              >
                {value
                  ? shopValues.find((st) => st.id === value)?.label
                  : `Select shop...`}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder={`Search shop...`} />
                <CommandList>
                  <CommandEmpty>No shops found.</CommandEmpty>

                  {shopValues.map((c) => (
                    <CommandItem
                      key={c.value}
                      value={c.value}
                      onSelect={() => {
                        setValue(c.id);
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
          <Button>
            <Search className="mr-2" />
            Search
          </Button>
        </div>
        <div></div>
      </div>
    </CardWrapper>
  );
};

export default ShopSearch;
