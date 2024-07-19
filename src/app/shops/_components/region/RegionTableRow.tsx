"use client";

import TooltipIconButton from "~/components/common/TooltipIconButton";
import { Input } from "~/components/ui/input";
import { type Region } from "@prisma/client";
import { Check, Edit, Trash, X } from "lucide-react";
import { useState } from "react";
import { TableCell, TableRow } from "~/components/ui/table";
import { api } from "~/trpc/react";
import { RegionDelete } from "./RegionDeleteConfirm";

const RegionTableRow = ({ region }: { region: Region }) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(region.name);
  const [err, setErr] = useState("");

  const utils = api.useUtils();
  const update = api.regions.update.useMutation({
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
  });

  const updateRegion = () => {
    if (name === "") {
      return;
    }
    if (name === region.name) {
      setEditMode(false);
    }
    update.mutate({ id: region.id, update: { name } });
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
            <RegionDelete id={region.id}/>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default RegionTableRow;
