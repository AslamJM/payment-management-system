"use client";

import { type Collector } from "@prisma/client";
import { type FC } from "react";
import { DeletModal } from "~/components/common/DeleteModal";
import { TableCell, TableRow } from "~/components/ui/table";
import { api } from "~/trpc/react";
import CreateCollectorForm from "./CreateCollectorForm";

interface CollectorRowProps {
  collector: Collector;
}

const CollectorRow: FC<CollectorRowProps> = ({ collector }) => {
  const utils = api.useUtils();

  const deleteCollector = api.collector.update.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        utils.collector.all.setData(undefined, (old) => {
          return old?.filter((sh) => sh.id !== collector.id);
        });
      }
    },
  });

  return (
    <TableRow key={collector.id}>
      <TableCell>{collector.name}</TableCell>
      <TableCell>{collector.phone}</TableCell>
      <TableCell>{collector.email}</TableCell>
      <TableCell>
        <div className="flex items-center gap-4">
          <CreateCollectorForm collector={collector} />
          <DeletModal
            deleteFn={() =>
              deleteCollector.mutate({
                id: collector.id,
                update: { status: false },
              })
            }
            name="Collector"
            loading={deleteCollector.isPending}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CollectorRow;
