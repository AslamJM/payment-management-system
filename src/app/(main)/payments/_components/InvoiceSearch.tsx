"use client";

import { Loader2, Search } from "lucide-react";
import { useState } from "react";
import CardWrapper from "~/components/common/CardWrapper";
import SimpleTableHeader from "~/components/common/SimpleTableHeader";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Table, TableBody } from "~/components/ui/table";
import { api } from "~/trpc/react";
import PaymentDueUpdate from "./PaymentDueUpdate";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "~/components/ui/scroll-area";

const InvoiceSearch = () => {
  const [invoice, setInvoice] = useState("");
  const [enabled, setEnabled] = useState(false);

  const { data, isLoading } = api.payment.searchInvoice.useQuery(invoice, {
    enabled,
  });

  return (
    <CardWrapper title="Search Invoice">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            value={invoice}
            onChange={(e) => setInvoice(e.target.value)}
            placeholder="Invoice number..."
            onFocus={() => setEnabled(false)}
          />
          <Button onClick={() => setEnabled(true)}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}{" "}
            Search
          </Button>
        </div>
        {!isLoading && !data && enabled && (
          <p className="text-muted-foreground">No invoice found.</p>
        )}
        {data && (
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
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
                <PaymentDueUpdate p={data} />
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </div>
    </CardWrapper>
  );
};

export default InvoiceSearch;
