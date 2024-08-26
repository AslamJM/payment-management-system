"use client";

import { useState } from "react";
import DateRange from "./DateRange";
import { api } from "~/trpc/react";
import ReportsTable from "./ReportsTable";
import CardWrapper from "~/components/common/CardWrapper";

const ReportsMain = () => {
  const [from, setFrom] = useState<Date | undefined>(undefined);
  const [to, setTo] = useState<Date | undefined>(undefined);
  const [queryEnabled, setQueryEnabled] = useState(false);

  const updateFrom = (d: Date) => {
    setQueryEnabled(false);
    setFrom(d);
  };

  const updateTo = (d: Date) => {
    setQueryEnabled(false);
    setTo(d);
  };

  const { data, isLoading } = api.payment.all.useQuery(
    {
      where: {
        payment_date: {
          gt: from,
          lt: to,
        },
      },
    },
    {
      enabled: queryEnabled,
    },
  );

  const fetchPayments = () => {
    setQueryEnabled(true);
  };

  return (
    <CardWrapper title="Payment Reports">
      <div className="space-y-4">
        <DateRange
          from={from}
          to={to}
          setFrom={updateFrom}
          setTo={updateTo}
          fetchPayments={fetchPayments}
          loading={isLoading}
        />
        {data && <ReportsTable data={data} />}
      </div>
    </CardWrapper>
  );
};

export default ReportsMain;
