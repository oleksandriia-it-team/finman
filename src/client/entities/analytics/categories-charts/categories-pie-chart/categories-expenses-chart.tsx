'use client';

import { useMemo } from 'react';
import { Pie, PieChart } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@frontend/ui/ui-chart/chart';
import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import { CategoriesMapping } from '@frontend/shared/styles/card-styles-mappings';
import { getVariantColor } from '@frontend/entities/analytics/categories-charts/categories-pie-chart/utils/get-variant-color.util';
import type { CategoriesChartProps } from '@frontend/entities/analytics/categories-charts/categories-pie-chart/props/categories-expenses-chart.props';
import { renderPieLabel } from '@frontend/entities/analytics/categories-charts/categories-pie-chart/render-pie-label';

export function CategoriesExpensesChart({ data }: CategoriesChartProps) {
  const chartConfig = useMemo(
    () => Object.fromEntries(data.map(({ category }) => [category, { label: CategoriesMapping[category].label }])),
    [data],
  );

  const chartData = useMemo(
    () =>
      data.map(({ category, amount }) => ({
        category,
        amount,
        label: CategoriesMapping[category].label,
        fill: getVariantColor(CategoriesMapping[category].variant),
      })),
    [data],
  );

  const total = useMemo(() => data.reduce((acc, { amount }) => acc + amount, 0), [data]);

  return (
    <div className="relative mx-auto aspect-square size-full">
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1">
        <FinTransformCurrency
          value={total}
          className="sm:text-2xl  md:text-lg lg:text-2xl font-medium"
        />
        <span className="text-xs text-muted-foreground">всього витрат</span>
      </div>

      <ChartContainer
        config={chartConfig}
        className="h-full w-full"
      >
        <PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                nameKey="label"
                formatter={(value, name, item) => (
                  <>
                    <div
                      className="shrink-0 rounded-xs h-2.5 w-2.5"
                      style={{ background: item?.payload?.fill as string }}
                    />
                    <div className="flex flex-1 justify-between items-center gap-4 leading-none">
                      <span className="text-muted-foreground">{item?.payload?.label ?? String(name)}</span>
                      <FinTransformCurrency
                        value={Number(value)}
                        className="font-mono font-medium tabular-nums inline text-foreground"
                      />
                    </div>
                  </>
                )}
              />
            }
          />
          <Pie
            data={chartData}
            dataKey="amount"
            nameKey="label"
            innerRadius="55%"
            outerRadius="80%"
            strokeWidth={4}
            label={renderPieLabel}
            labelLine={false}
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
