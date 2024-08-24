import React from "react";
import PaymentsThisMonth from "../_components/payments/PaymentsThisMonth";
import CreatePaymentForm from "../_components/payments/CreatePaymentForm";
import InvoiceSearch from "./_components/InvoiceSearch";
import ShopSearch from "./_components/ShopSearch";

const PaymentsPage = () => {
  return (
    <main className="grid grid-cols-3 gap-4">
      <div className="col-span-1">
        <PaymentsThisMonth />
      </div>
      <div className="col-span-2 space-y-2">
        <CreatePaymentForm payment={null} />
        <InvoiceSearch />
        <ShopSearch />
      </div>
    </main>
  );
};

export default PaymentsPage;
