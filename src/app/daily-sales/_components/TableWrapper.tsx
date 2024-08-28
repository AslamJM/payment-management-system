"use client";

import CardWrapper from "~/components/common/CardWrapper";
import PaymentTable from "./table";
import { usePayments } from "~/hooks/usePayments";
import TableFilters from "./TableFilters";

const TableWrapper = () => {
  const { payments, loading } = usePayments();
  return (
    <div className="space-y-6">
      <CardWrapper title="Payment Filters">
        <TableFilters />
      </CardWrapper>
      <CardWrapper title="Payments">
        <PaymentTable payments={payments ?? []} loading={loading} />
      </CardWrapper>
    </div>
  );
};

export default TableWrapper;
