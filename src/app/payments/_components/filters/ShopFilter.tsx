"use client";

import ComboBox from "~/components/common/ComboBox";
import { useValues } from "~/hooks/useValues";
import { type FilterProps } from "./filterProps";
import { usePayments } from "~/hooks/usePayments";

const ShopFilter = () => {
  const { shopValues } = useValues();

  const { getvalue, setValue } = usePayments();

  const fieldValue = getvalue<number>("shop_id");
  console.log(fieldValue);

  const onSelect = async (id: number) => {
    setValue("shop_id", id);
  };

  return (
    <div>
      <ComboBox
        values={shopValues}
        fieldValue={fieldValue}
        name="Shop"
        onSelect={onSelect}
      />
    </div>
  );
};

export default ShopFilter;
