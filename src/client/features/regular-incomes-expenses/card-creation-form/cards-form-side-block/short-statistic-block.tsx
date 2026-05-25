import React from 'react';
import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';

interface ShortStatisticBlockProps {
  factAverageExpenses: number;
  factAverageIncomes: number;
  increaseFactExpensesLastMonth: number;
  increaseFactIncomesLastMonth: number;
}

const StatItem = ({ value, label }: { value: string | number | React.ReactNode; label: string }) => (
  <div className="mt-4">
    <p className="text-sm">{label}</p>
    <span className="text-3xl">{value}</span>
  </div>
);

function formatPercent(value: number): string {
  const rounded = Math.round(value);
  const sign = rounded > 0 ? '+' : '';
  return `${sign}${rounded}%`;
}

export function ShortStatisticBlock({
  factAverageExpenses,
  factAverageIncomes,
  increaseFactExpensesLastMonth,
  increaseFactIncomesLastMonth,
}: ShortStatisticBlockProps) {
  return (
    <div className="size-full flex flex-row items-end text-primary-foreground">
      <div className="p-8 size-full flex flex-col justify-end">
        <h3 className="text-lg font-bold">Швидка статистика</h3>
        <StatItem
          value={<FinTransformCurrency value={factAverageExpenses} />}
          label="Середні витрати на місяць"
        />
        <StatItem
          value={formatPercent(increaseFactExpensesLastMonth)}
          label="Зміна витрат за останній місяць"
        />
      </div>

      <div className="p-8 size-full flex flex-col justify-end">
        <StatItem
          value={<FinTransformCurrency value={factAverageIncomes} />}
          label="Середні доходи на місяць"
        />
        <StatItem
          value={formatPercent(increaseFactIncomesLastMonth)}
          label="Зміна доходів за останній місяць"
        />
      </div>
    </div>
  );
}
