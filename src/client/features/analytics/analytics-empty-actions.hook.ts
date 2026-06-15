import { useTranslations } from 'next-intl';
import type { ChartEmptyAction } from '@frontend/components/chart-empty-state/chart-empty-state';
import { AppRoutes } from '@frontend/shared/constants/app-routes.constant';

interface AnalyticsEmptyActions {
  addOperation: ChartEmptyAction;
  budgetPlans: ChartEmptyAction;
}

export function useAnalyticsEmptyActions(): AnalyticsEmptyActions {
  const t = useTranslations('analytics');

  return {
    addOperation: {
      label: t('empty.addOperation'),
      href: AppRoutes.Profile.TrackingOperations.Add,
    },
    budgetPlans: {
      label: t('empty.goToBudgetPlans'),
      href: AppRoutes.Profile.Budget.Plans,
    },
  };
}
