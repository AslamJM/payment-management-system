"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import CardWrapper from "~/components/common/CardWrapper";
import Loader from "~/components/common/Loader";
import SimpleTableHeader from "~/components/common/SimpleTableHeader";
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
import { Table, TableRow } from "~/components/ui/table";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import SearchRow from "./SearchRow";

const SearchShop = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const { data: payments, isLoading } = api.shops.search.useQuery(name, {
    enabled: !!name,
  });
  const { data } = api.shops.all.useQuery();

  const values = useMemo(() => {
    if (data) {
      return data.map((sh) => ({ value: sh.name, label: sh.name }));
    }
    return [];
  }, [data]);

  return (
    <CardWrapper title="Due Payments" description="search by shop name">
      <div className="space-y-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[280px] justify-between text-sm font-normal"
            >
              {name
                ? values.find((st) => st.value === name)?.label
                : `Select Shop...`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Command>
              <CommandInput placeholder={`Search shop...`} />
              <CommandList>
                <CommandEmpty>No shops found.</CommandEmpty>

                {values.map((c) => (
                  <CommandItem
                    key={c.value}
                    value={c.value}
                    onSelect={() => {
                      setName(c.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        name === c.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {c.label}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {isLoading && <Loader />}
        {payments ? (
          payments.length === 0 ? (
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              This shop has no due payments.
            </div>
          ) : (
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
                  "Action",
                ]}
              />
              {payments.map((p) => (
                <SearchRow row={p} key={p.id} />
              ))}
            </Table>
          )
        ) : (
          <></>
        )}
      </div>
    </CardWrapper>
  );
};

export default SearchShop;
