import { Check, Loader2, X } from "lucide-react";
import { type FC } from "react";
import TooltipIconButton from "~/components/common/TooltipIconButton";
import { Button } from "~/components/ui/button";
import { TableCell, TableRow } from "~/components/ui/table";
import { api } from "~/trpc/react";

interface HistoryDeleteConfirmationProps {
  id: number;
  payment_id: number;
  cancel: () => void;
}

const HistoryDeleteConfirmation: FC<HistoryDeleteConfirmationProps> = ({
  id,
  payment_id,
  cancel,
}) => {
  const utils = api.useUtils();
  const { isPending, mutate } = api.history.deleteHistory.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        await utils.history.getAllForPayment.invalidate(payment_id);
        cancel();
      }
    },
  });

  const delConfirm = () => {
    mutate({
      id,
      payment_id,
    });
  };

  return (
    <TableRow>
      <TableCell colSpan={3}>
        Are you sure want to delete this history?
      </TableCell>
      <TableCell colSpan={0}></TableCell>
      <TableCell colSpan={0}></TableCell>
      <TableCell colSpan={1}>
        <div className="flex items-center justify-end gap-4">
          <TooltipIconButton content="Delete">
            <Button size="icon" variant="ghost" onClick={delConfirm}>
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

export default HistoryDeleteConfirmation;
