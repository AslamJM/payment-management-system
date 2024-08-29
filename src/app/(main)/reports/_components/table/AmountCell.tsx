import { type FC } from "react";
import { rupees } from "~/lib/utils";

interface AmountCellProps {
  amount: number;
}

const AmountCell: FC<AmountCellProps> = ({ amount }) => {
  return (
    <div className="text-right text-sm text-muted-foreground">
      {rupees(amount)}
    </div>
  );
};

export default AmountCell;
