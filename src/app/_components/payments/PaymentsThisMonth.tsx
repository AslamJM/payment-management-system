import { format } from "date-fns";
import AlignTableHeader from "~/components/common/AlignTableHeader";
import CardWrapper from "~/components/common/CardWrapper";
import { Table, TableCell, TableRow } from "~/components/ui/table";
import { rupees } from "~/lib/utils";
import { api } from "~/trpc/server";

const PaymentsThisMonth = async () => {
  const payments = await api.company.paymentsThisMonth();
  return (
    <CardWrapper
      title="Payment Collection"
      description={format(new Date(), "MMMM,yyyy")}
    >
      {payments.length === 0 && (
        <div className="text-muted-foreground">
          No payments for this month yet.
        </div>
      )}
      {payments.length > 0 && (
        <Table>
          <AlignTableHeader
            heads={[{ name: "Company" }, { name: "Total", align: "right" }]}
          />
          {payments.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell align="right">{rupees(c.total)}</TableCell>
            </TableRow>
          ))}
        </Table>
      )}
    </CardWrapper>
  );
};

export default PaymentsThisMonth;
