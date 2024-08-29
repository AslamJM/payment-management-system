"use client";

import { type Dispatch, type FC, type SetStateAction } from "react";
import Loader from "~/components/common/Loader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { api } from "~/trpc/react";
import SingleHistory from "./table/SingleHistory";
import { Table } from "~/components/ui/table";
import AlignTableHeader from "~/components/common/AlignTableHeader";
import { rupees } from "~/lib/utils";

interface PaymentHistoryDialogProps {
  paymentId: number;
  invoice: string;
  amount: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const PaymentHistoryDialog: FC<PaymentHistoryDialogProps> = ({
  paymentId,
  open,
  setOpen,
  invoice,
  amount,
}) => {
  const { data, isLoading } = api.history.getAllForPayment.useQuery(paymentId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Payment History</DialogTitle>
          <div className="flex items-center justify-between">
            <DialogDescription>
              <span className="font-semibold">Invoice No: </span>
              {invoice}
            </DialogDescription>
            <DialogDescription>
              <span className="font-semibold">Invoice Amount: </span>
              {rupees(amount)}
            </DialogDescription>
          </div>
        </DialogHeader>
        {isLoading && <Loader />}
        {data?.length === 0 && <div>No payment history for this invoice.</div>}
        <Table>
          <AlignTableHeader
            heads={[
              { name: "Date" },
              { name: "collector" },
              { name: "amount", align: "right" },
              { name: "action", align: "right" },
            ]}
          />
          {data?.map((h) => <SingleHistory history={h} key={h.id} />)}
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentHistoryDialog;
