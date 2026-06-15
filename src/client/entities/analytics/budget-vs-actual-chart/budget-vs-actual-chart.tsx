'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@frontend/ui/ui-chart/chart';
import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import { formatCurrency } from '@frontend/shared/utils/format-currency.util';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

const overspendColor = 'var(--orange)';

interface BudgetItem {
  label: string;
  plan: number;
  fact: number;
}

export function BudgetVsActualChart({ data }: { data: BudgetItem[] }) {
  const t = useTranslations('analytics.budgetVsActual');
  const chartConfig = useMemo(
    () => ({
      plan: { label: t('planLabel'), color: 'var(--primary)' },
      fact: { label: t('factLabel'), color: 'var(--success)' },
    }),
    [t],
  );

  return (
    <ChartContainer
      config={chartConfig}
      className="size-full"
    >
      <BarChart
        data={data}
        layout="vertical"
        barGap={4}
        margin={{ left: 8, right: 8 }}
      >
        <CartesianGrid horizontal={false} />
        <XAxis
          type="number"
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => formatCurrency(v, { notation: 'compact' })}
        />
        <YAxis
          type="category"
          dataKey="label"
          tickLine={false}
          axisLine={false}
          width={90}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => {
                const cfg = chartConfig[name as keyof typeof chartConfig];
                return (
                  <div className="flex flex-1 justify-between gap-4 leading-none">
                    <span className="text-muted-foreground">{cfg?.label ?? String(name)}</span>
                    <FinTransformCurrency
                      value={Number(value)}
                      className="font-mono font-medium tabular-nums text-foreground"
                    />
                  </div>
                );
              }}
            />
          }
        />

        <Bar
          dataKey="plan"
          fill="var(--color-plan)"
          radius={4}
          barSize={12}
        />

        <Bar
          dataKey="fact"
          radius={4}
          barSize={12}
        >
          {data.map((item, index) => (
            <Cell
              key={`${item.label}-${index}`}
              fill={item.fact > item.plan ? overspendColor : 'var(--color-fact)'}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
