"use client";

import { format } from "date-fns";
import { useMemo } from "react";
import { Bar, BarChart, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { rupees } from "~/lib/utils";
import { api } from "~/trpc/react";

const chartConfig = {
  activities: {
    label: "Payments",
  },
  running: {
    label: "Running",
    color: "hsl(var(--chart-2))",
  },
  swimming: {
    label: "Swimming",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function CompanyLineChart() {
  const { data } = api.company.paymentsThisMonth.useQuery();

  const chartData = useMemo(() => {
    if (!data) return;
    return data.map((d) => ({
      company: d.name,
      paid: d.paid,
      due: d.due,
    }));
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Payments</CardTitle>
        <CardDescription>{format(new Date(), "MMMM, yyyy")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="company"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Bar
              dataKey="paid"
              stackId="a"
              fill="var(--color-running)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="due"
              stackId="a"
              fill="var(--color-swimming)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(v: number) => rupees(v)}
              />
            </Bar>
            <ChartTooltip
              content={
                <ChartTooltipContent labelKey="activities" indicator="line" />
              }
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
