import { Trash } from "lucide-react";
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

export function RegionDelete({ id }: { id: number }) {
  return (
    <Dialog>
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
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2"></div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
