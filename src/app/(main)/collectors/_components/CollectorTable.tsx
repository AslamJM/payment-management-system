"use client";

import { Suspense, useState } from "react";
import CardWrapper from "~/components/common/CardWrapper";
import Loader from "~/components/common/Loader";
import SimpleTableHeader from "~/components/common/SimpleTableHeader";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { api } from "~/trpc/react";
import CollectorRow from "./CollectorTableRow";
import SimplePagination from "~/components/common/SimplePagination";

const CollectorsTable = () => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;
  const collectors = api.collector.all.useSuspenseQuery()[0];

  return (
    <CardWrapper title="Collectors" description="list of all collectors">
      <Table>
        <SimpleTableHeader heads={["Name", "Phone", "Email", "Actions"]} />
        <Suspense fallback={<Loader />}>
          <TableBody>
            {collectors.length === 0 ? (
              <TableRow>
                <TableCell>No collectors were created.</TableCell>
              </TableRow>
            ) : (
              collectors
                .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
                .map((s) => <CollectorRow collector={s} key={s.id} />)
            )}
          </TableBody>
        </Suspense>
      </Table>
      {collectors && (
        <SimplePagination
          count={collectors.length}
          page={page}
          itemsPerPage={itemsPerPage}
          onPageChange={setPage}
        />
      )}
    </CardWrapper>
  );
};

export default CollectorsTable;
