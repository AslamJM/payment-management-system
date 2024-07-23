import CreatePaymentForm from "./_components/payments/CreatePaymentForm";
import PaymentsThisMonth from "./_components/payments/PaymentsThisMonth";
import SearchShop from "./_components/payments/SearchShop";

export default async function Home() {
  return (
    <main>
      <CreatePaymentForm payment={null} />
      <PaymentsThisMonth />
      <SearchShop />
    </main>
  );
}
