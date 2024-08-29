"use client";

import { format } from "date-fns";
import { type FC, useState } from "react";
import ComboBox from "~/components/common/ComboBox";
import DatePickerWithLabel from "~/components/common/DatePickerWithLabel";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { TableCell, TableRow } from "~/components/ui/table";
import { useValues } from "~/hooks/useValues";
import { type ShopSeachRow } from "~/schemas/shop";
import { api } from "~/trpc/react";

interface SearchRowProps {
  row: ShopSeachRow;
  shopName: string;
}

const SearchRow: FC<SearchRowProps> = ({ row, shopName }) => {
  const [collector_id, setCollectorId] = useState<number | null>(null);
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const { id, company, due, total, invoice_number, payment_date } = row;

  const utils = api.useUtils();
  const { collectorValues } = useValues();

  const history = api.history.create.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        if (amount === row.due.toString()) {
          utils.shops.search.setData(shopName, (old) => {
            return old?.filter((p) => p.id !== id);
          });
        } else {
          utils.shops.search.setData(shopName, (old) => {
            return old?.map((p) =>
              p.id === id ? { ...p, due: p.due - Number(amount) } : p,
            );
          });
        }
        setCollectorId(null);
        setDate(new Date());
        setAmount("");
      }
    },
  });

  const disabled = history.isPending || !collector_id || !amount;

  const updateDue = () => {
    if (!collector_id) return;
    const input = {
      payment_id: id,
      amount: +amount,
      date,
      collector_id,
    };
    history.mutate(input);
  };

  return (
    <TableRow>
      <TableCell>{format(payment_date, "dd/MM/yyyy")}</TableCell>
      <TableCell>{invoice_number}</TableCell>
      <TableCell>{company.name}</TableCell>
      <TableCell>{total}</TableCell>
      <TableCell>{due}</TableCell>
      <TableCell>
        <ComboBox
          values={collectorValues}
          name="Collector"
          fieldValue={collector_id}
          onSelect={(id) => setCollectorId(id)}
        />
      </TableCell>
      <TableCell>
        <DatePickerWithLabel date={date} setDate={setDate} />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-x-2">
          <Input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
          <div className="flex items-center gap-1">
            <Checkbox
              onCheckedChange={(e) => {
                if (e) {
                  setAmount(row.due.toString());
                }
              }}
            />
            <Label>Full</Label>
          </div>
          <Button size="sm" disabled={disabled} onClick={updateDue}>
            update
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default SearchRow;
