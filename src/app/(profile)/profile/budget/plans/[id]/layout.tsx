'use client';

import { useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createBudgetPlanIdUrl } from '@common/domains/budget-plan/create-budget-plan-param-url.util';
import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { useSelectedBudgetPlan } from '@frontend/features/budget-plan/hooks/selected-budget-plan.hook';
import { parseBudgetPlanDateParam } from '@common/domains/budget-plan/get-budget-plan-date-param.util';
import { BudgetPlanHeader } from '@frontend/features/budget-plan/components/budget-plan-header';
import { UiLayoutContent } from '@frontend/ui/ui-layout-content/ui-layout-content';
import { useMerge } from '@frontend/shared/hooks/merge/merge.hook';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { getSafeErrorMessage } from '@common/utils/get-safe-error-message.util';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';

const IdIndexInPath = 4;

export default function BudgetPlanIdLayout({ children }: ChildrenComponentProps) {
  const { selectedBudgetPlanDate, setBudgetPlanDate, state, error } = useSelectedBudgetPlan();

  const router = useRouter();

  const pathname = usePathname();

  const firstRouteDate = useMemo(
    () => {
      const segments = pathname.split('/');
      const id = segments[IdIndexInPath];

      const date = parseBudgetPlanDateParam(id);

      if (date.success) {
        return date.data;
      }

      return selectedBudgetPlanDate;
    },
    // eslint-disable-next-line
    [],
  );

  // Here we get firstRouteDate in the first time and only selectedBudgetPlanDate value later
  // It's necessary to use the correct date in the next useEffect and avoid route replacing infinity
  const currSelectedBudgetPlanDate = useMerge([firstRouteDate, selectedBudgetPlanDate], firstRouteDate);

  // Update router path when selected budget plan month and year is changed
  useEffect(
    () => {
      const segments = pathname.split('/');

      segments[IdIndexInPath] = createBudgetPlanIdUrl(currSelectedBudgetPlanDate);

      if (segments.join('/') !== pathname) {
        router.replace(segments.join('/'));
      }
    },
    // eslint-disable-next-line
    [currSelectedBudgetPlanDate],
  );

  useEffect(
    () => {
      if (
        firstRouteDate.month === selectedBudgetPlanDate.month &&
        firstRouteDate.year === selectedBudgetPlanDate.year
      ) {
        return;
      }

      setBudgetPlanDate(firstRouteDate);
    }, // we don't need to execute the effect if selectedBudgetPlanDate is changed
    // eslint-disable-next-line
    [],
  );

  return (
    <div className="flex flex-col gap-4 h-full px-3 py-4">
      <BudgetPlanHeader
        selected={selectedBudgetPlanDate}
        onSelect={setBudgetPlanDate}
      />

      <UiLayoutContent>
        {state === PromiseState.Loading && <FinLoader />}

        {/*TODO update status later*/}
        {state === PromiseState.Error && (
          <FinErrorWidget
            message={getSafeErrorMessage(error)}
            status={400}
          />
        )}

        {state === PromiseState.Success && children}
      </UiLayoutContent>
    </div>
  );
}
