"use client";

import { useValues } from "~/hooks/useValues";
import ComboBoxWithLabel from "./ComboBoxWithLabel";

const RegionFilter = () => {
  const { regionValues } = useValues();

  return (
    <ComboBoxWithLabel name="Area" objectKey="shop" values={regionValues} />
  );
};

export default RegionFilter;
