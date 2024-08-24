import { format } from "date-fns";
import CardWrapper from "~/components/common/CardWrapper";
import SimpleTableHeader from "~/components/common/SimpleTableHeader";
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
      <Table>
        <SimpleTableHeader heads={["Comapny", "Total"]} />
        {payments.map((c) => (
          <TableRow key={c.id}>
            <TableCell>{c.name}</TableCell>
            <TableCell align="right">{rupees(c.total)}</TableCell>
          </TableRow>
        ))}
      </Table>
    </CardWrapper>
  );
};

export default PaymentsThisMonth;
