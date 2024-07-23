"use client";

import { RefreshCcwDot } from "lucide-react";
import { type FC } from "react";
import TooltipIconButton from "~/components/common/TooltipIconButton";
import { type Key, useQueryParams } from "~/hooks/useQueryParams";

interface ResetSingleFilterProps {
  objKey: Key;
}

const ResetSingleFilter: FC<ResetSingleFilterProps> = ({ objKey }) => {
  const remove = useQueryParams((state) => state.removeParam);
  return (
    <TooltipIconButton content="Reset" onClick={() => remove(objKey)}>
      <RefreshCcwDot className="h-4 w-4 cursor-pointer text-orange-500 hover:text-orange-600" />
    </TooltipIconButton>
  );
};

export default ResetSingleFilter;
