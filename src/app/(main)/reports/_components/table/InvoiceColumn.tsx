import { type FC, useState } from "react";
import { Button } from "~/components/ui/button";
import PaymentHistoryDialog from "../PaymentHistoryDialog";

interface InvoiceColumnProps {
  paymentId: number;
  invoice: string;
  amount: number;
}

const InvoiceColumn: FC<InvoiceColumnProps> = ({
  paymentId,
  invoice,
  amount,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <PaymentHistoryDialog
        invoice={invoice}
        paymentId={paymentId}
        open={open}
        setOpen={setOpen}
        amount={amount}
      />
      <Button variant="ghost" onClick={() => setOpen(true)}>
        {invoice}
      </Button>
    </div>
  );
};

export default InvoiceColumn;
