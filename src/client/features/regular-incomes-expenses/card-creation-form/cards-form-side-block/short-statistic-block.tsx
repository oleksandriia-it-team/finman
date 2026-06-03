'use client';

import React from 'react';
import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('regular.sideBlock');

  return (
    <div className="size-full flex flex-row items-end text-primary-foreground">
      <div className="p-8 size-full flex flex-col justify-end">
        <h3 className="text-lg font-bold">{t('statisticTitle')}</h3>
        <StatItem
          value={<FinTransformCurrency value={factAverageExpenses} />}
          label={t('averageExpenses')}
        />
        <StatItem
          value={formatPercent(increaseFactExpensesLastMonth)}
          label={t('changeExpenses')}
        />
      </div>

      <div className="p-8 size-full flex flex-col justify-end">
        <StatItem
          value={<FinTransformCurrency value={factAverageIncomes} />}
          label={t('averageIncomes')}
        />
        <StatItem
          value={formatPercent(increaseFactIncomesLastMonth)}
          label={t('changeIncomes')}
        />
      </div>
    </div>
  );
}
