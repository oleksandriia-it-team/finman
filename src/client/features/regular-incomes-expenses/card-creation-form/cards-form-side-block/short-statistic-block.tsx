import React from 'react';
import { UiTransformCurrency } from '@frontend/ui/ui-transform-currency/ui-transform-currency';

interface ShortStatisticBlockProps {
  activePayments: number;
  totalMonthExpenses: number;
  totalMonthIncomes: number;
  balance: number;
}

const StatItem = ({ value, label }: { value: string | number | React.ReactNode; label: string }) => (
  <div className="mt-4">
    <p className="text-sm">{label}</p>
    <span className="text-3xl">{value}</span>
  </div>
);

export function ShortStatisticBlock({
  activePayments,
  totalMonthIncomes,
  totalMonthExpenses,
  balance,
}: ShortStatisticBlockProps) {
  return (
    <div className="size-full flex flex-row items-end text-primary-foreground">
      <div className="p-8 size-full flex flex-col justify-end">
        <h3 className="text-lg font-bold">Швидка статистика</h3>
        <StatItem
          value={activePayments}
          label="Активних платежів"
        />
        <StatItem
          value={<UiTransformCurrency value={totalMonthExpenses} />}
          label="Щомісячні витрати"
        />
      </div>

      <div className="p-8 size-full flex flex-col justify-end">
        <StatItem
          value={<UiTransformCurrency value={totalMonthIncomes} />}
          label="Щомісячний дохід"
        />
        <StatItem
          value={<UiTransformCurrency value={balance} />}
          label="Баланс"
        />
      </div>
    </div>
  );
}
