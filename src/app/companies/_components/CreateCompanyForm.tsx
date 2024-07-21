"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Company } from "@prisma/client";
import { useForm } from "react-hook-form";
import CardWrapper from "~/components/common/CardWrapper";
import { Combobox } from "~/components/common/ComboBox";
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

import {
  createCompanySchema,
  type CreateCompanyInput,
} from "~/schemas/company";
import { api } from "~/trpc/react";

const CreateCompanyForm = () => {
  const form = useForm<CreateCompanyInput>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: "",
    },
  });

  const utils = api.useUtils();

  const create = api.company.create.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        utils.company.all.setData(undefined, (old: unknown) => {
          if (Array.isArray(old)) {
            return [...(old as Company[]), data.data] as Company[];
          }
        });
        form.reset();
      } else {
        form.setError("name", { message: data.message });
      }
    },
  });

  const onSubmit = (values: CreateCompanyInput) => {
    create.mutate(values);
  };

  return (
    <CardWrapper title="Create Company">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Comapny name" {...field} type="text" />
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

export default CreateCompanyForm;
