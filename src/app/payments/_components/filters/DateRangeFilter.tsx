import DatePickerWithLabel from "~/components/common/DatePickerWithLabel";
import { Label } from "~/components/ui/label";
import { useQueryParams } from "~/hooks/useQueryParams";
import ResetSingleFilter from "./ResetSingleFilter";

const DateRangeFilter = () => {
  const date = useQueryParams((state) => state.where).payment_date;
  const addParams = useQueryParams((state) => state.addParam);
  const from = date?.gt;
  const to = date?.lt;

  const setFrom = (d: Date) => {
    addParams("payment_date", !date ? { gt: d } : { ...date, gt: d });
  };
  const setTo = (d: Date) => {
    addParams("payment_date", !date ? { lt: d } : { ...date, lt: d });
  };

  return (
    <div className="col-span-2 grid grid-cols-2 gap-4">
      <div>
        <div className="mb-1 flex items-center justify-between">
          <Label>From</Label>
          <ResetSingleFilter objKey="payment_date" />
        </div>
        <DatePickerWithLabel date={from ?? null} setDate={setFrom} />
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between">
          <Label>To</Label>
          <ResetSingleFilter objKey="payment_date" />
        </div>
        <DatePickerWithLabel date={to ?? null} setDate={setTo} />
      </div>
    </div>
  );
};

export default DateRangeFilter;
