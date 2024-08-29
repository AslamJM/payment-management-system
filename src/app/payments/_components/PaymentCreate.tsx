"use client";

import { BadgeIndianRupee } from "lucide-react";
import { useState } from "react";
import CreatePaymentForm from "~/app/_components/payments/CreatePaymentForm";
import { Button } from "~/components/ui/button";

const PaymentCreate = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <BadgeIndianRupee className="mr-2 h-6 w-6" />
        Create Payment
      </Button>
      <CreatePaymentForm open={open} setOpen={setOpen} payment={null} />
    </div>
  );
};

export default PaymentCreate;
