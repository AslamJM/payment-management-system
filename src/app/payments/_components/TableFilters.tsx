import ShopFilter from "./filters/ShopFilter";
import CompanyFilter from "./filters/CompanyFilter";
import CollectorFilter from "./filters/CollectorFilter";
import DatePickerWithLabel from "~/components/common/DatePickerWithLabel";
import { useQueryParams } from "~/hooks/useQueryParams";
import { Label } from "~/components/ui/label";
import PaymentStatusFilter from "./filters/PaymentStatusFilter";
import VerifiedFilter from "./filters/VerifiedFilter";
import DateRangeFilter from "./filters/DateRangeFilter";
import { Button } from "~/components/ui/button";
import { RefreshCcw } from "lucide-react";

const TableFilters = () => {
  const where = useQueryParams((state) => state.where);
  const addParams = useQueryParams((state) => state.addParam);
  const reset = useQueryParams((state) => state.reset);

  const date = where.payment_date?.equals;
  const setDate = (d: Date) => addParams("payment_date", { equals: d });

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <ShopFilter />
        <CompanyFilter />
        <CollectorFilter />
        <PaymentStatusFilter />
        <VerifiedFilter />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div>
          <Label>Payment Date</Label>
          <DatePickerWithLabel date={date ?? null} setDate={setDate} />
        </div>
        <DateRangeFilter />
        <div className="flex items-end">
          <Button onClick={reset}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TableFilters;
