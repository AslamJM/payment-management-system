"use client";

import { Suspense, useState } from "react";
import CardWrapper from "~/components/common/CardWrapper";
import Loader from "~/components/common/Loader";
import SimpleTableHeader from "~/components/common/SimpleTableHeader";

import { Table, TableCell, TableRow } from "~/components/ui/table";
import { api } from "~/trpc/react";
import CompanyTableRow from "./CompanyTableRow";
import SimplePagination from "~/components/common/SimplePagination";

const CompanyTable = () => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;
  const company = api.company.all.useSuspenseQuery()[1];

  return (
    <CardWrapper title="Companies" description="list of companies">
      <Suspense fallback={<Loader />}>
        <Table>
          <SimpleTableHeader heads={["Name", "Actions"]} />
          {company.data.length === 0 && (
            <TableRow>
              <TableCell>No companies to show.</TableCell>
            </TableRow>
          )}
          {company.data.map((rg) => (
            <CompanyTableRow company={rg} key={rg.id} />
          ))}
        </Table>
      </Suspense>
      {company && (
        <SimplePagination
          count={company.data.length}
          page={page}
          itemsPerPage={itemsPerPage}
          onPageChange={setPage}
        />
      )}
    </CardWrapper>
  );
};

export default CompanyTable;
