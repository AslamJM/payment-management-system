import CreatePaymentForm from "./_components/payments/CreatePaymentForm";

export default async function Home() {
  return (
    <main>
      <CreatePaymentForm payment={null} />
    </main>
  );
}
