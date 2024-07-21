"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Edit, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ComboBox from "~/components/common/ComboBox";
import DatePickerWithLabel from "~/components/common/DatePickerWithLabel";
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
import { useValues } from "~/hooks/useValues";

import {
  createDefaultValues,
  paymentSchemaRhf,
  type WholePayment,
  type CreatePaymentInput,
  type PaymentCreate,
} from "~/schemas/payment";
import { api } from "~/trpc/react";

type Props = {
  payment: WholePayment | null;
};

const CreatePaymentForm = ({ payment }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { shopValues, companyValues, collectorValues } = useValues();

  const form = useForm<CreatePaymentInput>({
    resolver: zodResolver(paymentSchemaRhf),
    defaultValues: createDefaultValues(payment),
  });

  const utils = api.useUtils();

  const create = api.payment.create.useMutation({
    onSuccess: async (data) => {
      if (data?.success) {
        utils.payment.all.setData(undefined, (old: unknown) => {
          if (Array.isArray(old)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
            return [data.data, ...old];
          }
        });
        form.reset();
        setDialogOpen(false);
      } else {
        //if (data) form.setError("name", { message: data.message });
      }
    },
  });

  const updatePayment = api.payment.update.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        utils.payment.all.setData(undefined, (old) => {
          return old?.map((s) => (s.id === data.data?.id ? data.data : s));
        });
      }

      setDialogOpen(false);
    },
  });

  const onSubmit = (values: CreatePaymentInput) => {
    const { collector_id, company_id, shop_id } = values;

    if (!collector_id) {
      form.setError("collector_id", { message: "select a collector" });
      return;
    }

    if (!company_id) {
      form.setError("company_id", { message: "select a company" });
      return;
    }

    if (!shop_id) {
      form.setError("shop_id", { message: "select a shop" });
      return;
    }

    const input: PaymentCreate = {
      ...values,
      collector_id,
      shop_id,
      company_id,
    };
    create.mutate(input);
  };

  const onUpdate = (values: CreatePaymentInput) => {
    if (!payment) return;

    const { collector_id, company_id, shop_id } = values;

    if (!collector_id) {
      form.setError("collector_id", { message: "select a collector" });
      return;
    }

    if (!company_id) {
      form.setError("company_id", { message: "select a company" });
      return;
    }

    if (!shop_id) {
      form.setError("shop_id", { message: "select a shop" });
      return;
    }

    //updatePayment.mutate({ id: payment.id, update: values });
  };

  const total = form.watch("total");
  const paid = form.watch("paid");

  useEffect(() => {
    const due = total - paid < 0 ? 0 : total - paid;
    form.setValue("due", due);
  }, [total, paid, form]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {payment ? (
          <TooltipIconButton content="Edit">
            <Edit className="h-4 w-4 text-orange-500" />
          </TooltipIconButton>
        ) : (
          <Button>
            <Pencil />
            Create Payment
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{payment ? "Edit" : "Create"} Payment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={
              payment
                ? form.handleSubmit(onUpdate)
                : form.handleSubmit(onSubmit)
            }
            className=" space-y-4"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="shop_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block">Shop</FormLabel>
                    <ComboBox
                      fieldValue={field.value}
                      name="shop"
                      onSelect={(id: number) => form.setValue("shop_id", id)}
                      values={shopValues}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block">Company</FormLabel>
                    <ComboBox
                      fieldValue={field.value}
                      name="company"
                      onSelect={(id: number) => form.setValue("company_id", id)}
                      values={companyValues}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="collector_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block">Collector</FormLabel>
                    <ComboBox
                      fieldValue={field.value}
                      name="collector"
                      onSelect={(id: number) =>
                        form.setValue("collector_id", id)
                      }
                      values={collectorValues}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="payment_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block">Date</FormLabel>
                    <DatePickerWithLabel
                      date={field.value}
                      setDate={field.onChange}
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="invoice_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice No.</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Invoice Number"
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
                name="total"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="Total" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="paid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paid</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="free"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Free</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="saleable_return"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Saleable Return</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="market_return"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Market Return</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="due"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <Button
                disabled={create.isPending || updatePayment.isPending}
                type="submit"
              >
                {payment ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePaymentForm;
