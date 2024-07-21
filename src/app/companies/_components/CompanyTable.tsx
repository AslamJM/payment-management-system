"use client";

import { Suspense } from "react";
import CardWrapper from "~/components/common/CardWrapper";
import Loader from "~/components/common/Loader";
import SimpleTableHeader from "~/components/common/SimpleTableHeader";

import { Table, TableCell, TableRow } from "~/components/ui/table";
import { api } from "~/trpc/react";
import CompanyTableRow from "./CompanyTableRow";

const CompanyTable = () => {
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
    </CardWrapper>
  );
};

export default CompanyTable;
