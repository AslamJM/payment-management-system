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

const VerifiedFilter = () => {
  const addParams = useQueryParams((state) => state.addParam);
  const verified = useQueryParams((state) => state.where.verified);
  return (
    <div className="space-y-1">
      <Label>Verifed Status</Label>
      <Select
        value={verified ? "true" : "false"}
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
