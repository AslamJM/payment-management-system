"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { format } from "date-fns";
import { api } from "~/trpc/react";
import { rupees } from "~/lib/utils";
import Loader from "../common/Loader";

const colors = [
  "var(--color-chrome)",
  "var(--color-safari)",
  "var(--color-firefox)",
  "var(--color-edge)",
  "var(--color-other)",
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function AreaChart() {
  const { data, isLoading } = api.regions.paymentsPieChart.useQuery();

  const totalVisitors = React.useMemo(() => {
    if (!data) return 0;
    return data.reduce((a, d) => a + d.total, 0);
  }, [data]);

  if (data) {
    const cData = data.map((d, i) => ({
      area: d.region,
      total: d.total,
      fill: colors[i % colors.length],
    }));
    return (
      <Card>
        <CardHeader>
          <CardTitle>Areawise Payment Collection</CardTitle>
          <CardDescription>{format(new Date(), "MMMM, yyyy")}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          {isLoading && <Loader />}
          {data.length === 0 && (
            <div className="leading-none text-muted-foreground">
              No collections so far for this month.
            </div>
          )}
          {data.length > 0 && (
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={cData}
                  dataKey="total"
                  nameKey="area"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-xl font-bold"
                            >
                              {rupees(totalVisitors)}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy ?? 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Total collection
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          )}
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          {/* <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div> */}
          <div className="leading-none text-muted-foreground">
            Showing area wise collection of {format(new Date(), "MMMM, yyyy")}
          </div>
        </CardFooter>
      </Card>
    );
  }
}
