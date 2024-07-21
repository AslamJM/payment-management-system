import { type FC } from "react";
import ShopFilter from "./filters/ShopFilter";
import CompanyFilter from "./filters/CompanyFilter";
import CollectorFilter from "./filters/CollectorFilter";
import RegionFilter from "./filters/RegionFilter";
import DatePickerWithLabel from "~/components/common/DatePickerWithLabel";

interface TableFiltersProps {
  getvalue: <R>(key: string) => R | null;
  setValue: (key: string, value: string | number | boolean | object) => void;
}

const TableFilters: FC<TableFiltersProps> = ({ getvalue, setValue }) => {
  const date = getvalue<Date>("payment_date");
  const onDatePick = (date: Date) => setValue("payment_date", { equals: date });

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <ShopFilter getvalue={getvalue} setValue={setValue} />
      <CompanyFilter getvalue={getvalue} setValue={setValue} />
      <CollectorFilter getvalue={getvalue} setValue={setValue} />
      <RegionFilter getvalue={getvalue} setValue={setValue} />

      <DatePickerWithLabel date={date} setDate={onDatePick} />
    </div>
  );
};

export default TableFilters;
