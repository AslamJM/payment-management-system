"use client";

import { Suspense, useState } from "react";
import CardWrapper from "~/components/common/CardWrapper";
import Loader from "~/components/common/Loader";
import SimpleTableHeader from "~/components/common/SimpleTableHeader";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { api } from "~/trpc/react";
import ShopRow from "./ShopRow";
import SimplePagination from "~/components/common/SimplePagination";

const ShopsTable = () => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;
  const shops = api.shops.all.useSuspenseQuery()[0];

  return (
    <CardWrapper title="Shops" description="list of all shops">
      <Table>
        <SimpleTableHeader heads={["Name", "Area", "Address", "Actions"]} />
        <Suspense fallback={<Loader />}>
          <TableBody>
            {shops.length === 0 ? (
              <TableRow>
                <TableCell>No shops were created.</TableCell>
              </TableRow>
            ) : (
              shops.map((s) => <ShopRow shop={s} key={s.id} />)
            )}
          </TableBody>
        </Suspense>
      </Table>
      {shops && (
        <SimplePagination
          count={shops.length}
          page={page}
          itemsPerPage={itemsPerPage}
          onPageChange={setPage}
        />
      )}
    </CardWrapper>
  );
};

export default ShopsTable;
