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

const PaymentStatusFilter = () => {
  const addParams = useQueryParams((state) => state.addParam);
  const paymentStatus = useQueryParams((state) => state.where.payment_status);
  return (
    <div className="space-y-1">
      <Label>Payment Status</Label>
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
