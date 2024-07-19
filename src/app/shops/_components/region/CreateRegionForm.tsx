"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Region } from "@prisma/client";
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

import { createRegionSchema, type CreateRegionInput } from "~/schemas/region";
import { api } from "~/trpc/react";

const CreateRegionForm = () => {
  const form = useForm<CreateRegionInput>({
    resolver: zodResolver(createRegionSchema),
    defaultValues: {
      name: "",
    },
  });

  const utils = api.useUtils();

  const create = api.regions.create.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        utils.regions.all.setData(undefined, (old: unknown) => {
          if (Array.isArray(old)) {
            return [...(old as Region[]), data.data] as Region[];
          }
        });
        form.reset();
      } else {
        form.setError("name", { message: data.message });
      }
    },
  });

  const onSubmit = (values: CreateRegionInput) => {
    create.mutate(values);
  };

  return (
    <CardWrapper title="Create Area">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area Name</FormLabel>
                <FormControl>
                  <Input placeholder="Area name" {...field} type="text" />
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

export default CreateRegionForm;
