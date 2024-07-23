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

const PaymentStatusFilter = () => {
  const addParams = useQueryParams((state) => state.addParam);
  const paymentStatus = useQueryParams((state) => state.where.payment_status);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <Label>Payment Status</Label>
        <ResetSingleFilter objKey="payment_status" />
      </div>
      <Select
        value={paymentStatus}
        onValueChange={(v) => addParams("payment_status", v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Payment Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PAID">Paid</SelectItem>
          <SelectItem value="DUE">Due</SelectItem>
          <SelectItem value="CANCELLED">Cancelled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PaymentStatusFilter;
