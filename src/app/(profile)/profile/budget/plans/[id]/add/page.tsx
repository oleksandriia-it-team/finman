'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { createBudgetPlanIdUrl } from '@common/domains/budget-plan/create-budget-plan-param-url.util';
import { isCurrentMonth } from '@common/domains/budget-plan/is-current-month.util';
import { getSafeAppError } from '@common/utils/get-safe-app-error.util';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { BudgetPlanFormScreen } from '@frontend/features/budget-plan/budget-plan-form/create-budget-plan/budget-plan-create-screen';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { useSelectedBudgetPlan } from '@frontend/features/budget-plan/hooks/selected-budget-plan.hook';
import { useBudgetPlanDraftStore } from '@frontend/features/budget-plan/hooks/budget-plan-draft';
import { useRegularTransactions } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';
import { useHidePlusButton } from '@frontend/widgets/profile-mobile-navbar/use-hide-plus-button';
import { useTranslations } from 'next-intl';

const AllRegularsPageSize = 10000;

export default function CreateBudgetPlanPage() {
  const t = useTranslations('budgetPlan.form');
  useHidePlusButton();
  const router = useRouter();

  const { selectedBudgetPlanDate, lastLoadedBudgetPlan, state, error } = useSelectedBudgetPlan();
  const { getPayments } = useRegularTransactions();
  const { initDraft, isInitialized } = useBudgetPlanDraftStore();

  const id = createBudgetPlanIdUrl(selectedBudgetPlanDate);
  const isCurrent = isCurrentMonth(selectedBudgetPlanDate);

  const allRegularsQuery = useQuery({
    queryKey: ['budget-plan-all-regulars'],
    queryFn: () => getPayments(1, AllRegularsPageSize),
    enabled: isCurrent && !lastLoadedBudgetPlan,
  });

  useEffect(() => {
    if (state === PromiseState.Success && lastLoadedBudgetPlan) {
      router.replace(`/profile/budget/plans/${id}/edit`);
    }
  }, [state, lastLoadedBudgetPlan, id, router]);

  useEffect(() => {
    if (allRegularsQuery.data && !isInitialized) {
      initDraft(allRegularsQuery.data, []);
    }
  }, [allRegularsQuery.data, isInitialized, initDraft]);

  if (state === PromiseState.Loading) return <FinLoader />;

  if (state === PromiseState.Error) {
    const appError = getSafeAppError(error);
    return (
      <FinErrorWidget
        message={appError.message}
        status={appError.status}
      />
    );
  }

  if (lastLoadedBudgetPlan) return null;

  if (!isCurrent) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 h-full px-4">
        <p className="text-muted-foreground text-sm text-center">{t('onlyCurrentMonth')}</p>
      </div>
    );
  }

  if (allRegularsQuery.isPending) return <FinLoader />;

  return (
    <BudgetPlanFormScreen
      onCancel={() => router.push(`/profile/budget/plans/${id}`)}
      onSuccess={() => router.push(`/profile/budget/plans/${id}/recommendations`)}
    />
  );
}
