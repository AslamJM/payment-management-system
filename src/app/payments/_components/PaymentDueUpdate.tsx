import { format } from "date-fns";
import { useState, type FC } from "react";
import ComboBox from "~/components/common/ComboBox";
import DatePickerWithLabel from "~/components/common/DatePickerWithLabel";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { TableCell, TableRow } from "~/components/ui/table";
import { useValues } from "~/hooks/useValues";
import { type DuePaymentSearchResult } from "~/schemas/payment";
import { api } from "~/trpc/react";

interface PaymentDueUpdateProps {
  p: DuePaymentSearchResult;
  shop_id?: number;
}

const PaymentDueUpdate: FC<PaymentDueUpdateProps> = ({ p, shop_id }) => {
  const [collector_id, setCollectorId] = useState<number | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [amount, setAmount] = useState("");

  const { collectorValues } = useValues();

  const utils = api.useUtils();

  const { mutate, isPending } = api.history.create.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        setCollectorId(null);
        setDate(null);
        setAmount("");
        if (shop_id) {
          await utils.payment.duePaymentsShop.invalidate(shop_id);
        }
      }
    },
  });

  const onSelectCollector = (id: number) => {
    setCollectorId(id);
  };

  const selectDate = (d: Date) => {
    setDate(d);
  };

  const updatePayment = () => {
    if (!collector_id || !date || !amount) return;
    mutate({
      amount: +amount,
      collector_id,
      date,
      payment_id: p.id,
    });
  };

  return (
    <TableRow>
      <TableCell>{format(p.payment_date, "dd/MM/yyyy")}</TableCell>
      <TableCell>{p.invoice_number}</TableCell>
      <TableCell>{p.company.name}</TableCell>
      <TableCell>{p.total}</TableCell>
      <TableCell>{p.due}</TableCell>
      <TableCell>
        <ComboBox
          fieldValue={collector_id}
          name="Collector"
          onSelect={onSelectCollector}
          values={collectorValues}
        />
      </TableCell>
      <TableCell>
        <DatePickerWithLabel date={date} setDate={selectDate} />
      </TableCell>
      <TableCell>
        <div className="w-[100px]">
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            max={p.due}
            placeholder="Amount"
          />
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2 px-2">
          <div className="flex items-center gap-2">
            <Checkbox
              onCheckedChange={(e) => {
                if (e) {
                  setAmount(p.due.toString());
                }
              }}
            />{" "}
            <Label>Full</Label>
          </div>
          <Button
            size="sm"
            disabled={!collector_id || !date || !amount || isPending}
            onClick={updatePayment}
          >
            Update
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PaymentDueUpdate;
