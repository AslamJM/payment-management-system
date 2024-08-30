"use client";

import { Suspense, useState } from "react";
import CardWrapper from "~/components/common/CardWrapper";
import Loader from "~/components/common/Loader";
import SimpleTableHeader from "~/components/common/SimpleTableHeader";

import { Table, TableCell, TableRow } from "~/components/ui/table";
import { api } from "~/trpc/react";
import RegionTableRow from "./RegionTableRow";
import SimplePagination from "~/components/common/SimplePagination";

const RegionsTable = () => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;
  const region = api.regions.all.useSuspenseQuery()[1];

  return (
    <CardWrapper title="Areas" description="list of areas">
      <Suspense fallback={<Loader />}>
        <Table>
          <SimpleTableHeader heads={["Name", "Actions"]} />
          {region.data.length === 0 && (
            <TableRow>
              <TableCell>No areas to show.</TableCell>
            </TableRow>
          )}
          {region.data.map((rg) => (
            <RegionTableRow region={rg} key={rg.id} />
          ))}
        </Table>
      </Suspense>
      {region && (
        <SimplePagination
          count={region.data.length}
          page={page}
          itemsPerPage={itemsPerPage}
          onPageChange={setPage}
        />
      )}
    </CardWrapper>
  );
};

export default RegionsTable;
