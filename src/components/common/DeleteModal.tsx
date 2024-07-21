"use client";

import { Trash } from "lucide-react";
import { useState } from "react";
import TooltipIconButton from "~/components/common/TooltipIconButton";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

type DeleteProps = {
  name: string;
  deleteFn: () => void;
  loading: boolean;
};

export function DeletModal({ deleteFn, loading, name }: DeleteProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <TooltipIconButton
          content="Delete"
          onClick={() => {
            //
          }}
        >
          <Trash className="h-4 w-4 text-red-600" />
        </TooltipIconButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete {name}</DialogTitle>
          <DialogDescription>
            Are you sure wanted to delete this {name.toLowerCase()}?. All other
            functionalities related to this {name.toLowerCase()} will be
            stopped.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2"></div>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              deleteFn();
              setOpen(false);
            }}
            disabled={loading}
          >
            Delete
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
