'use client';

import type { ReactNode } from 'react';
import { ChartCard } from '@frontend/components/chart-card-template/chart-card-template';
import type { ChartEmptyAction } from '@frontend/components/chart-empty-state/chart-empty-state';
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
  emptyAction?: ChartEmptyAction | undefined;
}

export function BudgetVsActualChartCard({
  data,
  loading,
  filterTrigger,
  mode,
  onModeChange,
  emptyAction,
}: BudgetVsActualChartCardProps) {
  const t = useTranslations('analytics');
  return (
    <ChartCard
      title={t('budgetVsActual.title')}
      description={t('budgetVsActual.description')}
      filterTrigger={filterTrigger}
      loading={loading}
      isEmpty={data.length === 0}
      emptyTitle={t('empty.title')}
      emptyDescription={t('empty.noBudgetPlan')}
      emptyAction={emptyAction}
    >
      <div className="flex gap-2 px-6 pb-2">
        <UiTabItem
          isActive={mode === 'operations'}
          onClick={() => onModeChange('operations')}
        >
          {t('budgetVsActual.modeOperations')}
        </UiTabItem>
        <UiTabItem
          isActive={mode === 'category'}
          onClick={() => onModeChange('category')}
        >
          {t('budgetVsActual.modeCategory')}
        </UiTabItem>
      </div>
      <BudgetVsActualChart data={data} />
    </ChartCard>
  );
}
