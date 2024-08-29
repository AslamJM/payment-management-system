import { format } from "date-fns";
import AlignTableHeader from "~/components/common/AlignTableHeader";
import CardWrapper from "~/components/common/CardWrapper";
import { Table, TableCell, TableRow } from "~/components/ui/table";
import { rupees } from "~/lib/utils";
import { api } from "~/trpc/server";

const DuePaymentsThisMonth = async () => {
  const data = await api.shops.duePaymentsForMonth();
  return (
    <CardWrapper
      title="Due Payments"
      description={format(new Date(), "MMMM,yyyy")}
    >
      {data.length > 0 && (
        <Table>
          <AlignTableHeader
            heads={[
              { name: "Shop" },
              { name: "Due Amount", align: "right" },
              { name: "Due Date", align: "right" },
            ]}
          />
          {data.map((d) => (
            <TableRow key={d.shop.id}>
              <TableCell>{d.shop.name}</TableCell>
              <TableCell align="right">{rupees(d.due)}</TableCell>
              <TableCell align="right">
                {format(d.due_date, "dd/MM/yyyy")}
              </TableCell>
            </TableRow>
          ))}
        </Table>
      )}
      {data.length === 0 && (
        <div className="leading-none text-muted-foreground">
          No due payments this month.
        </div>
      )}
    </CardWrapper>
  );
};

export default DuePaymentsThisMonth;
