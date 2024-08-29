import { type FC } from "react";
import { Button } from "~/components/ui/button";

import DatePickerWithLabel from "~/components/common/DatePickerWithLabel";
import { Label } from "~/components/ui/label";
import CardWrapper from "~/components/common/CardWrapper";
import { Loader2 } from "lucide-react";

interface DateRangeProps {
  fetchPayments: () => void;
  from: Date | undefined;
  to: Date | undefined;
  setFrom: (d: Date) => void;
  setTo: (d: Date) => void;
  loading: boolean;
}

const DateRange: FC<DateRangeProps> = ({
  from,
  to,
  setFrom,
  setTo,
  fetchPayments,
  loading,
}) => {
  return (
    <div className="flex flex-col items-end gap-4 md:flex-row">
      <div className="w-full md:w-[250px]">
        <Label>From</Label>
        <DatePickerWithLabel date={from ?? null} setDate={setFrom} />
      </div>
      <div className="w-full md:w-[250px]">
        <Label>To</Label>
        <DatePickerWithLabel date={to ?? null} setDate={setTo} />
      </div>
      <Button disabled={!from || !to || loading} onClick={fetchPayments}>
        {loading && <Loader2 className="mr-2 animate-spin" />}
        {loading ? "Fetching..." : "Fetch Payments"}
      </Button>
    </div>
  );
};

export default DateRange;
