import { type FC } from "react";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { cn } from "~/lib/utils";

interface AlignTableHeaderProps {
  heads: {
    name: string;
    align?: "left" | "center" | "right" | "justify" | "char" | undefined;
  }[];
}

const AlignTableHeader: FC<AlignTableHeaderProps> = ({ heads }) => {
  return (
    <TableHeader>
      <TableRow>
        {heads.map((head) => (
          <TableHead
            key={head.name}
            className={`${cn(head.align === "right" ? "text-right" : "")}`}
          >
            {head.name}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default AlignTableHeader;
