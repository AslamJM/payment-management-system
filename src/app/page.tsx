import CreatePaymentForm from "./_components/payments/CreatePaymentForm";
import PaymentsThisMonth from "./_components/payments/PaymentsThisMonth";
import SearchShop from "./_components/payments/SearchShop";

export default async function Home() {
  return (
    <main className="space-y-4">
      <CreatePaymentForm payment={null} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:w-1/2">
          <PaymentsThisMonth />
        </div>
        <div></div>
      </div>
      <SearchShop />
    </main>
  );
}
