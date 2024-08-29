"use client";

import { Check, Edit, Loader2, MoreHorizontal, Trash, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState, type FC } from "react";
import CreatePaymentForm from "~/app/(main)/_components/payments/CreatePaymentForm";
import DeletePaymentDialog from "~/app/(main)/_components/payments/DeletePaymentDialog";
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
  const { data: session } = useSession();

  const [editOpen, setEditOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);

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

  if (!session || session.user.role === "EMPLOYEE") {
    return;
  }

  return (
    <>
      <CreatePaymentForm
        payment={payment}
        open={editOpen}
        setOpen={setEditOpen}
      />
      <DeletePaymentDialog
        open={delOpen}
        setOpen={setDelOpen}
        paymentId={payment.id}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
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
                {verify.isPending && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}{" "}
                Verify
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Edit className="mr-2 h-4 w-4 text-orange-500" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDelOpen(true)}>
            <Trash className="mr-2 h-4 w-4 text-red-500" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ColumnMenu;
