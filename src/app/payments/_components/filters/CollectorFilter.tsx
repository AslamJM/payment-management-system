"use client";

import ComboBox from "~/components/common/ComboBox";
import { useValues } from "~/hooks/useValues";
import { type FilterProps } from "./filterProps";

const CollectorFilter = ({ getvalue, setValue }: FilterProps) => {
  const { collectorValues } = useValues();

  const fieldValue = getvalue<number>("collector_id");

  const onSelect = async (id: number) => {
    setValue("collector_id", id);
  };

  return (
    <div>
      <ComboBox
        values={collectorValues}
        fieldValue={fieldValue}
        name="Collector"
        onSelect={onSelect}
      />
    </div>
  );
};

export default CollectorFilter;
