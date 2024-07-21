"use client";

import ComboBox from "~/components/common/ComboBox";
import { useValues } from "~/hooks/useValues";
import { type FilterProps } from "./filterProps";

const RegionFilter = ({ getvalue, setValue }: FilterProps) => {
  const { regionValues } = useValues();

  const fieldValue = getvalue<{ region_id: number }>("shop");

  const onSelect = async (id: number) => {
    setValue("shop", { region_id: id });
  };

  return (
    <div>
      <ComboBox
        values={regionValues}
        fieldValue={fieldValue?.region_id ?? null}
        name="Area"
        onSelect={onSelect}
      />
    </div>
  );
};

export default RegionFilter;
