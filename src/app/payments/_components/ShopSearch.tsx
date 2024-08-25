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
import { Check, ChevronsUpDown, Loader2, Search } from "lucide-react";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import SimpleTableHeader from "~/components/common/SimpleTableHeader";
import { Table, TableBody } from "~/components/ui/table";
import PaymentDueUpdate from "./PaymentDueUpdate";

const ShopSearch = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  const { shopValues } = useValues();

  const { data, isLoading } = api.payment.duePaymentsShop.useQuery(value!, {
    enabled: enabled,
  });

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
                        setEnabled(false);
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
          <Button onClick={() => setEnabled(true)}>
            <Search className="m-4 mr-2 h-4" />
            Search
          </Button>
        </div>
        <div className="py-4">
          {isLoading && (
            <div>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
              <span className="text-sm text-muted">Searching...</span>
            </div>
          )}
          {data && (
            <Table>
              <SimpleTableHeader
                heads={[
                  "Invoice Date",
                  "Invoice",
                  "Company",
                  "Total",
                  "Due",
                  "Collector",
                  "Date",
                  "Amount",
                  "Action",
                ]}
              />
              <TableBody>
                {data.map((p) => (
                  <PaymentDueUpdate key={p.id} p={p} shop_id={value!} />
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </CardWrapper>
  );
};

export default ShopSearch;
