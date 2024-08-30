import { zodResolver } from "@hookform/resolvers/zod";
import { type Collector, type PaymentHistory } from "@prisma/client";
import { Check, Loader2, X } from "lucide-react";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import _ from "underscore";
import { type z } from "zod";
import ComboBox from "~/components/common/ComboBox";
import DatePickerWithLabel from "~/components/common/DatePickerWithLabel";
import TooltipIconButton from "~/components/common/TooltipIconButton";
import { Button } from "~/components/ui/button";
import { FormField } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { TableCell, TableRow } from "~/components/ui/table";
import { useValues } from "~/hooks/useValues";
import { diffObject } from "~/lib/diffObject";
import { updateHistoryInputSchema } from "~/schemas/payment";
import { api } from "~/trpc/react";

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

  const utils = api.useUtils();

  const { mutate, isPending } = api.history.updateHistory.useMutation({
    onSuccess: async (data) => {
      console.log(data);

      if (data.success) {
        await utils.history.getAllForPayment.invalidate(history.payment_id);
        form.reset();
        cancel();
      }
    },
  });

  const onSubmit = () => {
    const values = form.getValues();
    const currentHistory = _.pick(history, "amount", "collector_id", "date");

    const changedUpdate = diffObject(currentHistory, values.update);
    values.update = changedUpdate;
    mutate(values);
  };

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
          <TooltipIconButton content="Update">
            <Button
              size="icon"
              variant="ghost"
              onClick={onSubmit}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4 text-green-500" />
              )}
            </Button>
          </TooltipIconButton>
          <TooltipIconButton content="Cancel">
            <Button size="icon" variant="ghost" onClick={cancel}>
              <X className="h-4 w-4 text-red-500" />
            </Button>
          </TooltipIconButton>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default HistoryEditForm;
