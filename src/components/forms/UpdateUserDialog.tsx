import { type User } from "@prisma/client";
import { type FC, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "~/components/ui/input";
import TooltipIconButton from "../common/TooltipIconButton";
import { Edit, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import _ from "underscore";
import { diffObject } from "~/lib/diffObject";
import { api } from "~/trpc/react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  role: z.enum(["ADMIN", "EMPLOYEE"]),
});

type FormData = z.infer<typeof formSchema>;

interface UpdateUserDialogProps {
  user: Pick<User, "id" | "name" | "username" | "role">;
}

const UpdateUserDialog: FC<UpdateUserDialogProps> = ({ user }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name ?? "",
      username: user.username,
      role: user.role,
    },
  });

  const utils = api.useUtils();

  const { isPending, mutate } = api.users.updateUser.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        await utils.users.getAll.invalidate();
        setDialogOpen(false);
      }
    },
  });

  const onSubmit = (values: FormData) => {
    const oguser = _.pick(user, "name", "username", "role");
    const updateObj = {
      id: user.id,
      update: diffObject(oguser, values),
    };
    mutate(updateObj);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <TooltipIconButton content="Edit">
          <Edit className="h-4 w-4 text-orange-500" />
        </TooltipIconButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="EMPLOYEE">Employee</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 animate-spin" />}
              {isPending ? "Updating..." : "Update User"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserDialog;
