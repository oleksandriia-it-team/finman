'use client';

import type { ReactNode } from 'react';
import { ChartCardLayout } from '@frontend/components/chart-card-template/chart-card-template';
import { FinLoaderShort } from '@frontend/components/loader/fin-loader-short';
import { BudgetVsActualChart } from '@frontend/entities/analytics/budget-vs-actual-chart/budget-vs-actual-chart';
import type { BudgetVsActualChartProps } from '@frontend/entities/analytics/budget-vs-actual-chart/props/budget-vs-actual-props';
import { UiTabItem } from '@frontend/ui/ui-tab-item/ui-tab-item';
import { useTranslations } from 'next-intl';

export type BudgetVsActualMode = 'category' | 'operations';

interface BudgetVsActualChartCardProps extends BudgetVsActualChartProps {
  loading?: boolean;
  filterTrigger?: ReactNode;
  mode: BudgetVsActualMode;
  onModeChange: (mode: BudgetVsActualMode) => void;
}

export function BudgetVsActualChartCard({
  data,
  loading,
  filterTrigger,
  mode,
  onModeChange,
}: BudgetVsActualChartCardProps) {
  const t = useTranslations('analytics.budgetVsActual');
  return (
    <ChartCardLayout.Root>
      <ChartCardLayout.Header
        title={t('title')}
        description={t('description')}
      >
        {filterTrigger}
      </ChartCardLayout.Header>
      <div className="flex gap-2 px-6 pb-2">
        <UiTabItem
          isActive={mode === 'category'}
          onClick={() => onModeChange('category')}
        >
          {t('modeCategory')}
        </UiTabItem>
        <UiTabItem
          isActive={mode === 'operations'}
          onClick={() => onModeChange('operations')}
        >
          {t('modeOperations')}
        </UiTabItem>
      </div>
      <ChartCardLayout.Content>
        {loading ? <FinLoaderShort /> : <BudgetVsActualChart data={data} />}
      </ChartCardLayout.Content>
    </ChartCardLayout.Root>
  );
}
