import DuePaymentsThisMonth from "./_components/payments/DuePaymentsThisMonth";
import AreaChart from "~/components/dashboard/AreaChart";
import CompanyLineChart from "~/components/dashboard/CompanyLineChart";

export default async function Home() {
  return (
    <main className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DuePaymentsThisMonth />
        <div>
          <AreaChart />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CompanyLineChart />
      </div>
    </main>
  );
}
