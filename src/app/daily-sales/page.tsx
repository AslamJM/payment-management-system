import React from "react";
import TableWrapper from "./_components/TableWrapper";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";

const PaymentsPage = () => {
  return (
    <main>
      <ScrollArea className="max-w-full overflow-x-auto">
        <TableWrapper />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </main>
  );
};

export default PaymentsPage;
