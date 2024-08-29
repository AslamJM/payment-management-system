import { zodResolver } from "@hookform/resolvers/zod";
import { type Collector, type PaymentHistory } from "@prisma/client";
import { Check, X } from "lucide-react";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import ComboBox from "~/components/common/ComboBox";
import DatePickerWithLabel from "~/components/common/DatePickerWithLabel";
import TooltipIconButton from "~/components/common/TooltipIconButton";
import { FormField } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { TableCell, TableRow } from "~/components/ui/table";
import { useValues } from "~/hooks/useValues";
import { updateHistoryInputSchema } from "~/schemas/payment";

interface HistoryEditFormProps {
  history: PaymentHistory & {
    collector: Collector;
  };
  cancel: () => void;
}

type FormValue = z.infer<typeof updateHistoryInputSchema>;

const HistoryEditForm: FC<HistoryEditFormProps> = ({ history, cancel }) => {
  const defaultValues: FormValue = {
    id: history.id,
    paymentId: history.payment_id,
    update: {
      amount: history.amount,
      collector_id: history.collector_id,
      date: history.date,
    },
  };

  const { collectorValues } = useValues();

  const form = useForm({
    resolver: zodResolver(updateHistoryInputSchema),
    defaultValues,
  });
  return (
    <TableRow>
      <TableCell>
        <FormField
          control={form.control}
          name="update.date"
          render={({ field }) => (
            <DatePickerWithLabel
              date={field.value ?? null}
              setDate={field.onChange}
            />
          )}
        />
      </TableCell>
      <TableCell>
        <FormField
          control={form.control}
          name="update.collector_id"
          render={({ field }) => (
            <ComboBox
              fieldValue={field.value ?? null}
              name="collector"
              onSelect={(id: number) =>
                form.setValue("update.collector_id", id)
              }
              values={collectorValues}
            />
          )}
        />
      </TableCell>
      <TableCell align="right">
        <FormField
          control={form.control}
          name="update.amount"
          render={({ field }) => (
            <Input
              placeholder="Amount"
              {...field}
              type="number"
              onChange={(e) => field.onChange(+e.target.value)}
              className="w-[120px]"
            />
          )}
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-end gap-4">
          <TooltipIconButton content="Update" onClick={cancel}>
            <Check className="h-4 w-4 text-green-500" />
          </TooltipIconButton>
          <TooltipIconButton content="Cancel" onClick={cancel}>
            <X className="h-4 w-4 text-red-500" />
          </TooltipIconButton>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default HistoryEditForm;
