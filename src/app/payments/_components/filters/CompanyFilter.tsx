"use client";

import ComboBox from "~/components/common/ComboBox";
import { useValues } from "~/hooks/useValues";
import { type FilterProps } from "./filterProps";

const CompanyFilter = ({ getvalue, setValue }: FilterProps) => {
  const { companyValues } = useValues();

  const fieldValue = getvalue<number>("company_id");

  const onSelect = async (id: number) => {
    setValue("company_id", id);
  };

  return (
    <div>
      <ComboBox
        values={companyValues}
        fieldValue={fieldValue}
        name="Company"
        onSelect={onSelect}
      />
    </div>
  );
};

export default CompanyFilter;
