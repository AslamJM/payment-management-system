"use client";

import { useValues } from "~/hooks/useValues";
import ComboBoxWithLabel from "./ComboBoxWithLabel";

const CompanyFilter = () => {
  const { companyValues } = useValues();

  return (
    <div>
      <ComboBoxWithLabel
        name="Company"
        objectKey="company_id"
        values={companyValues}
      />
    </div>
  );
};

export default CompanyFilter;
