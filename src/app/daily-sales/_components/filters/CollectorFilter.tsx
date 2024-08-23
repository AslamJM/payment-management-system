"use client";

import { useValues } from "~/hooks/useValues";
import ComboBoxWithLabel from "./ComboBoxWithLabel";

const CollectorFilter = () => {
  const { collectorValues } = useValues();

  return (
    <ComboBoxWithLabel
      name="Collector"
      objectKey="collector_id"
      values={collectorValues}
    />
  );
};

export default CollectorFilter;
