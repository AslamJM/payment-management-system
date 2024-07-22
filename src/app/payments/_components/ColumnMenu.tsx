"use client";

import { Check, MoreHorizontal } from "lucide-react";
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
import { type WholePayment } from "~/schemas/payment";

interface ColumnMenuProps {
  payment: WholePayment;
}

const ColumnMenu: FC<ColumnMenuProps> = ({ payment }) => {
  const [open, setOpen] = useState(false);
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
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            //
          }}
        >
          {payment.verified ? (
            <>
              <Check className="mr-2 text-green-500" /> Verifed
            </>
          ) : (
            "Verify"
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <CreatePaymentForm payment={payment} />
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnMenu;
