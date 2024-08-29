"use client";

import TooltipIconButton from "~/components/common/TooltipIconButton";
import { Input } from "~/components/ui/input";
import { type Region } from "@prisma/client";
import { Check, Edit, X } from "lucide-react";
import { useState } from "react";
import { TableCell, TableRow } from "~/components/ui/table";
import { api } from "~/trpc/react";
import { DeletModal } from "~/components/common/DeleteModal";
import { useRole } from "~/hooks/useRole";

const RegionTableRow = ({ region }: { region: Region }) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(region.name);
  const [err, setErr] = useState("");

  const { isAdmin } = useRole();

  const utils = api.useUtils();
  const update = api.regions.update.useMutation();

  const updateRegion = () => {
    if (name === "") {
      return;
    }
    if (name === region.name) {
      setEditMode(false);
    }
    update.mutate(
      { id: region.id, update: { name } },
      {
        onSuccess: (data) => {
          if (data) {
            if (data.success) {
              utils.regions.all.setData(undefined, (old) => {
                if (old) {
                  const updated = old.map((r) =>
                    r.id === data.data?.id ? data.data : r,
                  );
                  return updated;
                }
              });
              setEditMode(false);
            } else {
              setErr(data.message);
            }
          }
        },
      },
    );
  };

  const deleteRegion = () => {
    update.mutate(
      { id: region.id, update: { status: false } },
      {
        onSuccess: (data) => {
          if (data?.success) {
            utils.regions.all.setData(undefined, (old) => {
              return old?.filter((rg) => rg.id !== region.id);
            });
          }
        },
      },
    );
  };

  return (
    <TableRow>
      <TableCell className="w-3/4">
        {editMode ? (
          <div>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <p className="text-sm font-medium text-destructive">{err}</p>
          </div>
        ) : (
          <>{region.name}</>
        )}
      </TableCell>
      <TableCell className="w-1/4">
        {isAdmin && (
          <>
            {editMode ? (
              <div className="flex items-center gap-4">
                <TooltipIconButton
                  content="OK"
                  onClick={() => {
                    updateRegion();
                  }}
                >
                  <Check className="h-4 w-4 text-green-500" />
                </TooltipIconButton>
                <TooltipIconButton
                  content="Cancel"
                  onClick={() => {
                    setEditMode(false);
                    setName(region.name);
                  }}
                >
                  <X className="h-4 w-4 text-red-600" />
                </TooltipIconButton>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <TooltipIconButton
                  content="Edit"
                  onClick={() => {
                    setEditMode(true);
                  }}
                >
                  <Edit className="h-4 w-4 text-orange-500" />
                </TooltipIconButton>
                <DeletModal
                  deleteFn={deleteRegion}
                  loading={update.isPending}
                  name="Area"
                />
              </div>
            )}
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default RegionTableRow;
