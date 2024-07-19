"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Shop } from "@prisma/client";
import { useForm } from "react-hook-form";
import CardWrapper from "~/components/common/CardWrapper";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import { createShopSchema, type CreateShopInput } from "~/schemas/shop";
import { api } from "~/trpc/react";

const CreateShopForm = () => {
  const form = useForm<CreateShopInput>({
    resolver: zodResolver(createShopSchema),
    defaultValues: {
      name: "",
      address: "",
      region_id: undefined,
    },
  });

  const utils = api.useUtils();

  const create = api.shops.create.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        utils.shops.all.setData(undefined, (old: unknown) => {
          if (Array.isArray(old)) {
            return [...(old as Shop[]), data.data] as Shop[];
          }
        });
        form.reset();
      } else {
        form.setError("name", { message: data.message });
      }
    },
  });

  const onSubmit = (values: CreateShopInput) => {
    create.mutate(values);
  };

  return (
    <CardWrapper title="Create Shop">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <Button disabled={create.isPending} type="submit">
              Create
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default CreateShopForm;
