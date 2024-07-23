"use client";

import { Check, Loader2, MoreHorizontal, Trash, X } from "lucide-react";
import { useState, type FC } from "react";
import CreatePaymentForm from "~/app/_components/payments/CreatePaymentForm";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useQueryParams } from "~/hooks/useQueryParams";
import { type WholePayment } from "~/schemas/payment";
import { api } from "~/trpc/react";

interface ColumnMenuProps {
  payment: WholePayment;
}

const ColumnMenu: FC<ColumnMenuProps> = ({ payment }) => {
  const [open, setOpen] = useState(false);

  const utils = api.useUtils();
  const where = useQueryParams((state) => state.where);
  const verify = api.payment.verifyPayments.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        utils.payment.all.setData({ where }, (old) => {
          return old?.map((p) =>
            p.id === payment.id ? { ...p, verified: true } : p,
          );
        });
      }
    },
  });

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-between">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <X
            className=" mr-2 h-4 w-4 cursor-pointer text-red-400 hover:text-red-600"
            onClick={() => setOpen(false)}
          />
        </div>

        <DropdownMenuItem
          onClick={() => {
            if (!payment.verified) {
              verify.mutate([payment.id]);
            }
          }}
        >
          {payment.verified ? (
            <>
              <Check className="mr-2 h-4 w-4 text-green-500" /> Verifed
            </>
          ) : (
            <>
              {verify.isPending && <Loader2 className="h-4 w-4 animate-spin" />}{" "}
              Verify
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <CreatePaymentForm
          payment={payment}
          close={() => {
            setOpen(false);
          }}
        />
        <DropdownMenuItem>
          <Trash className="mr-2 h-4 w-4 text-red-500" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnMenu;
