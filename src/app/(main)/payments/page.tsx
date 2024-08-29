import React from "react";
import PaymentsThisMonth from "../_components/payments/PaymentsThisMonth";
import InvoiceSearch from "./_components/InvoiceSearch";
import ShopSearch from "./_components/ShopSearch";
import PaymentCreate from "./_components/PaymentCreate";
import { getServerAuthSession } from "~/server/auth";

const PaymentsPage = async () => {
  const session = await getServerAuthSession();
  return (
    <main className="grid grid-cols-3 gap-4">
      <div className="col-span-1">
        <PaymentsThisMonth />
      </div>
      {session && session.user.role === "ADMIN" && (
        <div className="col-span-2 space-y-4">
          <PaymentCreate />
          <InvoiceSearch />
          <ShopSearch />
        </div>
      )}
    </main>
  );
};

export default PaymentsPage;
