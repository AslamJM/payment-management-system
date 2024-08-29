"use client";

import { Loader2 } from "lucide-react";
import { type FC } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { usePayments } from "~/hooks/usePayments";
import { api } from "~/trpc/react";

interface DeletePaymentDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  paymentId: number;
}

const DeletePaymentDialog: FC<DeletePaymentDialogProps> = ({
  open,
  setOpen,
  paymentId,
}) => {
  const { deleteData } = usePayments();
  const { mutate, isPending } = api.payment.deletePayment.useMutation({
    onSuccess: async (data) => {
      if (data.sucess) {
        deleteData(paymentId);
      }
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Payment</DialogTitle>
        </DialogHeader>
        <div>
          <p>Are you sure want to delete this payment?</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() => mutate(paymentId)}
          >
            {isPending && <Loader2 className="mr-2 h-6 w-6" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePaymentDialog;
