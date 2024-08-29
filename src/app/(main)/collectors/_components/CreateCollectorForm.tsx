"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Collector } from "@prisma/client";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Edit, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TooltipIconButton from "~/components/common/TooltipIconButton";
import { Button } from "~/components/ui/button";

import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useRole } from "~/hooks/useRole";

import {
  createCollectorSchema,
  type CreateCollectorInput,
} from "~/schemas/collector";
import { api } from "~/trpc/react";

type Props = {
  collector: Collector | null;
};

const CreateCollectorForm = ({ collector }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<CreateCollectorInput>({
    resolver: zodResolver(createCollectorSchema),
    defaultValues: collector
      ? {
          name: collector.name,
          phone: collector.phone,
          email: collector.email ?? "",
        }
      : {
          name: "",
          phone: "",
          email: "",
        },
  });

  const utils = api.useUtils();

  const create = api.collector.create.useMutation({
    onSuccess: async (data) => {
      if (data?.success) {
        utils.collector.all.setData(undefined, (old: unknown) => {
          if (Array.isArray(old)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
            return [data.data, ...old];
          }
        });
        form.reset();
        setDialogOpen(false);
      } else {
        if (data) form.setError("name", { message: data.message });
      }
    },
  });

  const updateCollector = api.collector.update.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        utils.collector.all.setData(undefined, (old) => {
          return old?.map((s) => (s.id === data.data?.id ? data.data : s));
        });
      }

      setDialogOpen(false);
    },
  });

  const onSubmit = (values: CreateCollectorInput) => {
    create.mutate(values);
  };

  const onUpdate = (values: CreateCollectorInput) => {
    if (!collector) return;
    updateCollector.mutate({ id: collector.id, update: values });
  };

  const { isEmployee } = useRole();

  if (isEmployee) {
    return;
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {collector ? (
          <TooltipIconButton content="Edit">
            <Edit className="h-4 w-4 text-orange-500" />
          </TooltipIconButton>
        ) : (
          <Button>
            <Pencil />
            Create Collector
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{collector ? "Edit" : "Create"} Collector</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={
              collector
                ? form.handleSubmit(onUpdate)
                : form.handleSubmit(onSubmit)
            }
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Collector name"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone Number" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button
                disabled={create.isPending || updateCollector.isPending}
                type="submit"
              >
                {collector ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollectorForm;
