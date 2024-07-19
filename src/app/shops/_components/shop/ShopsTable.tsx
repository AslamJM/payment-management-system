"use client";

import { Suspense } from "react";
import CardWrapper from "~/components/common/CardWrapper";
import Loader from "~/components/common/Loader";
import SimpleTableHeader from "~/components/common/SimpleTableHeader";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { api } from "~/trpc/react";

const ShopsTable = () => {
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
              shops.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.region.name}</TableCell>
                  <TableCell>{s.address}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Suspense>
      </Table>
    </CardWrapper>
  );
};

export default ShopsTable;
