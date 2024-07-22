"use client";

import { useValues } from "~/hooks/useValues";
import ComboBoxWithLabel from "./ComboBoxWithLabel";

const ShopFilter = () => {
  const { shopValues } = useValues();

  return (
    <ComboBoxWithLabel name="Shop" objectKey="shop_id" values={shopValues} />
  );
};

export default ShopFilter;
