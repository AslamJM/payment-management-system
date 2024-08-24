import { format } from "date-fns";
import { type FC } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { TableCell, TableRow } from "~/components/ui/table";
import { type DuePaymentSearchResult } from "~/schemas/payment";

interface PaymentDueUpdateProps {
  p: DuePaymentSearchResult;
}

const PaymentDueUpdate: FC<PaymentDueUpdateProps> = ({ p }) => {
  return (
    <TableRow>
      <TableCell>{format(p.payment_date, "dd/MM/yyyy")}</TableCell>
      <TableCell>{p.invoice_number}</TableCell>
      <TableCell>{p.company.name}</TableCell>
      <TableCell>{p.total}</TableCell>
      <TableCell>{p.due}</TableCell>
      <TableCell>{p.due}</TableCell>
      <TableCell>{p.due}</TableCell>
      <TableCell>
        <Input />
      </TableCell>
      <TableCell>
        <div className="flex">
          <Checkbox />
          <Button>Update</Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PaymentDueUpdate;
