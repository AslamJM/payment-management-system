import { type Dispatch, type SetStateAction, type FC } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "~/components/ui/pagination";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SimplePaginationProps {
  count: number;
  page: number;
  itemsPerPage: number;
  onPageChange: Dispatch<SetStateAction<number>>;
}

const SimplePagination: FC<SimplePaginationProps> = ({
  count,
  page,
  itemsPerPage,
  onPageChange,
}) => {
  const totalpages = Math.ceil(count / itemsPerPage);

  return (
    <Pagination className="mt-2 flex justify-end ">
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 0}
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
        </PaginationItem>
        {Array.from({ length: totalpages }, (_, i) => (
          <PaginationItem key={i}>
            <Button variant="ghost" onClick={() => onPageChange(i)}>
              {i + 1}
            </Button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <Button
            variant="ghost"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalpages - 1}
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default SimplePagination;
