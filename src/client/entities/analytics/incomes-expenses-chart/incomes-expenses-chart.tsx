'use client';

import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@frontend/ui/ui-chart/chart';
import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import { MonthTitles } from '@common/constants/month-titles.constant';
import type { IncomesExpensesChartProps } from '@frontend/entities/analytics/incomes-expenses-chart/props/incomes-expenses-chart.props';

const ShortMonthLabelLength = 3;

const chartConfig = {
  incomes: { label: 'Доходи', color: 'var(--success)' },
  expenses: { label: 'Витрати', color: 'var(--destructive-foreground)' },
};

export function IncomesExpensesChart({ data }: IncomesExpensesChartProps) {
  const chartData = useMemo(() => data.map((item) => ({ ...item, monthLabel: MonthTitles[item.month] })), [data]);

  return (
    <ChartContainer
      className="size-full"
      config={chartConfig}
    >
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="monthLabel"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value: string) => value.slice(0, ShortMonthLabelLength)}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              indicator="dashed"
              formatter={(value, name) => {
                const configEntry = chartConfig[name as keyof typeof chartConfig];
                return (
                  <>
                    <div
                      className="shrink-0 w-0 border-[1.5px] border-dashed bg-transparent my-0.5"
                      style={{ borderColor: configEntry?.color ?? 'var(--muted-foreground)' }}
                    />
                    <div className="flex flex-1 justify-between items-center gap-4 leading-none">
                      <span className="text-muted-foreground">{configEntry?.label ?? String(name)}</span>
                      <FinTransformCurrency
                        value={Number(value)}
                        className="font-mono font-medium tabular-nums inline text-foreground"
                      />
                    </div>
                  </>
                );
              }}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="incomes"
          fill="var(--color-incomes)"
          radius={4}
        />
        <Bar
          dataKey="expenses"
          fill="var(--color-expenses)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}
