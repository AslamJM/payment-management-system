"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Region, type Shop } from "@prisma/client";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Check, ChevronsUpDown, Edit, Pencil } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import TooltipIconButton from "~/components/common/TooltipIconButton";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

import { createShopSchema, type CreateShopInput } from "~/schemas/shop";
import { api } from "~/trpc/react";

type Props = {
  shop: (Shop & { region: Region }) | null;
};

const CreateShopForm = ({ shop }: Props) => {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const regions = api.regions.all.useQuery();

  const values = useMemo(() => {
    if (regions.data) {
      return regions.data.map((d) => ({
        id: d.id,
        value: d.name,
        label: d.name,
      }));
    }
    return [];
  }, [regions]);

  const form = useForm<CreateShopInput>({
    resolver: zodResolver(createShopSchema),
    defaultValues: shop
      ? {
          name: shop.name,
          address: shop.address,
          region_id: shop.region_id,
        }
      : {
          name: "",
          address: "",
          region_id: undefined,
        },
  });

  const utils = api.useUtils();

  const create = api.shops.create.useMutation({
    onSuccess: async (data) => {
      if (data?.success) {
        utils.shops.all.setData(undefined, (old: unknown) => {
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

  const updateShop = api.shops.update.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        utils.shops.all.setData(undefined, (old) => {
          return old?.map((s) => (s.id === data.data?.id ? data.data : s));
        });
      }

      setDialogOpen(false);
    },
  });

  const onSubmit = (values: CreateShopInput) => {
    create.mutate(values);
  };

  const onUpdate = (values: CreateShopInput) => {
    if (!shop) return;
    updateShop.mutate({ id: shop.id, update: values });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {shop ? (
          <TooltipIconButton content="Edit">
            <Edit className="h-4 w-4 text-orange-500" />
          </TooltipIconButton>
        ) : (
          <Button>
            <Pencil className="mr-2 h-6 w-6" />
            Create Shop
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{shop ? "Edit" : "Create"} Shop</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={
              shop ? form.handleSubmit(onUpdate) : form.handleSubmit(onSubmit)
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
                    <Input placeholder="Shop name" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block">Store</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {field.value
                          ? values.find((st) => st.id === field.value)?.label
                          : "Select Area..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search area..." />
                        <CommandList>
                          <CommandEmpty>No areas found.</CommandEmpty>

                          {values.map((c) => (
                            <CommandItem
                              key={c.value}
                              value={c.value}
                              onSelect={() => {
                                form.setValue("region_id", c.id);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === c.id
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {c.label}
                            </CommandItem>
                          ))}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Shop Address" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button
                disabled={create.isPending || updateShop.isPending}
                type="submit"
              >
                {shop ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateShopForm;
