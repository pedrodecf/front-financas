"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

const chartData = [{ fixed: 1260, personal: 570 }];
const chartConfig = {
  fixed: {
    label: "Fixos",
    color: "hsl(var(--chart-1))",
  },
  personal: {
    label: "Pessoais",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type TBalanceChartDashboard = {
  className?: string;
};

export function BalanceChartDashboard({ className }: TBalanceChartDashboard) {
  const totalExpenses = chartData[0].fixed + chartData[0].personal;
  const percentageFixed = Number(
    ((chartData[0].fixed / totalExpenses) * 100).toFixed(2)
  );
  const percentagePersonal = Number(
    ((chartData[0].personal / totalExpenses) * 100).toFixed(2)
  );

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="pb-0">
        <CardTitle className="text-sm text-sub font-semibold leading-none tracking-tight">
          Balanço de custos
        </CardTitle>
      </CardHeader>
      <CardContent className="@container/card mt-2 -mb-2">
        <div className="flex flex-col-reverse items-center justify-center @md/card:flex-row">
          {getPercentageExpenses({
            personalColor: "bg-[#64CFF6]",
            personalPercentage: percentagePersonal,
            fixedColor: "bg-[#6359E9]",
            fixedPercentage: percentageFixed,
          })}
          <ChartContainer
            config={chartConfig}
            className="mx-auto w-full max-w-[250px]"
          >
            <RadialBarChart
              width={250}
              height={125}
              cy={100}
              data={chartData}
              startAngle={180}
              endAngle={0}
              innerRadius={80}
              outerRadius={120}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <PolarRadiusAxis
                tick={false}
                axisLine={false}
                className="flex items-center justify-center"
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className="fill-foreground text-2xl font-bold"
                          >
                            <tspan className="text-xs">R$</tspan>
                            {totalExpenses.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground"
                          >
                            Despesas
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="fixed"
                stackId="a"
                cornerRadius={5}
                fill="#6359E9"
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="personal"
                fill="#64CFF6"
                stackId="a"
                cornerRadius={5}
                className="stroke-transparent stroke-2"
              />
            </RadialBarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );

  interface getPercentageExpensesProps {
    personalColor: string;
    personalPercentage: number;
    fixedColor: string;
    fixedPercentage: number;
  }

  function getPercentageExpenses(props: getPercentageExpensesProps) {
    return (
      <>
        <div className="flex flex-row gap-4 w-full justify-around @xl/card:flex-row @md/card:flex-col">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-block rounded-full h-3 w-3",
                  props.fixedColor
                )}
              />
              <p className="text-sub">Custos fixos</p>
            </div>
            <div>
              <p className="text-lg font-semibold">{props.fixedPercentage}%</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-block rounded-full h-3 w-3",
                  props.personalColor
                )}
              />
              <p className="text-sub">Gastos pessoais</p>
            </div>
            <div>
              <p className="text-lg font-semibold">
                {props.personalPercentage}%
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
