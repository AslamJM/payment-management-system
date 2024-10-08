import { type Collector, type PaymentHistory } from "@prisma/client";
import { format } from "date-fns";
import { Edit, Trash } from "lucide-react";
import { useState, type FC } from "react";
import TooltipIconButton from "~/components/common/TooltipIconButton";
import { TableCell, TableRow } from "~/components/ui/table";
import { rupees } from "~/lib/utils";
import HistoryEditForm from "./HistoryEditForm";
import HistoryDeleteConfirmation from "./HistoryDeleteConfirmation";

interface SingleHistoryProps {
  history: PaymentHistory & {
    collector: Collector;
  };
}

const SingleHistory: FC<SingleHistoryProps> = ({ history }) => {
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const cancelEdit = () => {
    setEditMode(false);
  };

  const cancelDelete = () => {
    setDeleteMode(false);
  };

  if (editMode) {
    return <HistoryEditForm history={history} cancel={cancelEdit} />;
  }

  if (deleteMode) {
    return (
      <HistoryDeleteConfirmation
        id={history.id}
        payment_id={history.payment_id}
        cancel={cancelDelete}
      />
    );
  }

  return (
    <TableRow>
      <TableCell>{format(history.date, "dd/MM/yyyy")}</TableCell>
      <TableCell>{history.collector.name}</TableCell>
      <TableCell align="right">{rupees(history.amount)}</TableCell>
      <TableCell>
        <div className="flex items-center justify-end gap-4">
          <TooltipIconButton
            content="Edit History"
            onClick={() => {
              setDeleteMode(false);
              setEditMode(true);
            }}
          >
            <Edit className="h-4 w-4 text-orange-500" />
          </TooltipIconButton>
          <TooltipIconButton
            content="Delete History"
            onClick={() => {
              setEditMode(false);
              setDeleteMode(true);
            }}
          >
            <Trash className="h-4 w-4 text-red-500" />
          </TooltipIconButton>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default SingleHistory;
