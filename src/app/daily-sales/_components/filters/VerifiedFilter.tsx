"use client";

import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useQueryParams } from "~/hooks/useQueryParams";
import ResetSingleFilter from "./ResetSingleFilter";

const VerifiedFilter = () => {
  const addParams = useQueryParams((state) => state.addParam);
  const verified = useQueryParams((state) => state.where.verified);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <Label>Verifed Status</Label>
        <ResetSingleFilter objKey="verified" />
      </div>

      <Select
        value={verified !== undefined ? (verified ? "true" : "false") : ""}
        onValueChange={(v) =>
          addParams("verified", v === "true" ? true : false)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Verifed Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">Verified</SelectItem>
          <SelectItem value="false">Not verified</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default VerifiedFilter;
