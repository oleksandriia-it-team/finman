'use client';

import { useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createBudgetPlanIdUrl } from '@common/domains/budget-plan/create-budget-plan-param-url.util';
import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { useSelectedBudgetPlan } from '@frontend/features/budget-plan/hooks/selected-budget-plan.hook';
import { parseBudgetPlanDateParam } from '@common/domains/budget-plan/get-budget-plan-date-param.util';

const IdIndexInPath = 2;

export default function BudgetPlanIdLayout({ children }: ChildrenComponentProps) {
  const { selectedBudgetPlanDate, setBudgetPlanDate } = useSelectedBudgetPlan();

  const router = useRouter();

  const pathname = usePathname();

  // Update router path when selected budget plan month and year is changed
  useEffect(() => {
    const segments = pathname.split('/');
    segments[IdIndexInPath] = createBudgetPlanIdUrl(selectedBudgetPlanDate);

    if (segments.join('/') !== pathname) {
      router.replace(segments.join('/'));
    }
  }, [pathname, router, selectedBudgetPlanDate]);

  const routeDate = useMemo(() => {
    const segments = pathname.split('/');
    const id = segments[IdIndexInPath];

    const date = parseBudgetPlanDateParam(id);

    if (date.success) {
      return date.data;
    }

    return selectedBudgetPlanDate;
  }, [pathname, selectedBudgetPlanDate]);

  useEffect(() => {
    if (routeDate.month === selectedBudgetPlanDate.month && routeDate.year === selectedBudgetPlanDate.year) {
      return;
    }

    setBudgetPlanDate(routeDate);
  }, [
    routeDate,
    routeDate.month,
    routeDate.year,
    selectedBudgetPlanDate.month,
    selectedBudgetPlanDate.year,
    setBudgetPlanDate,
  ]);

  return children;
}
