import type { BudgetPlanFormScreenProps } from '@frontend/features/budget-plan/budget-plan-form/create-budget-plan/budget-plan-create-screen-props';
import { useRegularTransactions } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';
import { useQuery } from '@tanstack/react-query';
import { getPromiseState } from '@frontend/shared/utils/get-promise-state.util';
import { getFirstAppError } from '@common/utils/get-first-app-error.util';

const MaxRegularTransactions = 1000;

export function useBudgetPlanScreenState({ initialData, onCancel }: BudgetPlanFormScreenProps) {
  const isEdit = !!initialData;
  const { getPayments } = useRegularTransactions();

  const { data, status, error } = useQuery({
    queryKey: ['budget-plan-regular-transactions'],
    queryFn: () => getPayments(1, MaxRegularTransactions),
    staleTime: 0,
  });

  return {
    state: getPromiseState(status),
    options: data ?? [],
    appError: getFirstAppError(error),
    isEdit,
    onCancel,
  };
}
