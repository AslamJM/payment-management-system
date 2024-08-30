import { useState, type FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import TooltipIconButton from "../common/TooltipIconButton";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { api } from "~/trpc/react";
import { toast } from "../ui/use-toast";

interface DeleteUserDialogProps {
  id: string;
}

const DeleteUserDialog: FC<DeleteUserDialogProps> = ({ id }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const utils = api.useUtils();
  const { mutate, isPending } = api.users.deleteUser.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        await utils.users.getAll.invalidate();
        toast({
          title: "user delete",
          description: data.message,
        });
        setDialogOpen(false);
      } else {
        toast({
          title: "user delete",
          description: data.message,
          variant: "destructive",
        });
      }
    },
  });
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <TooltipIconButton content="Delete">
          <Trash className="h-4 w-4 text-red-500" />
        </TooltipIconButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
        </DialogHeader>
        <div>Are you sure want to delete this user?</div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => mutate(id)}
            disabled={isPending}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;
