import { useCombineStates } from '@frontend/shared/hooks/combine-states/combine-states.hook';
import type { BudgetPlanFormScreenProps } from '@frontend/features/budget-plan/budget-plan-form/create-budget-plan/budget-plan-create-screen-props';
import { calculateFromAndTo } from '@common/utils/calculate-from-and-to.util';
import { useRegularTransactions } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { useBudgetPlanForm } from '@frontend/features/budget-plan/hooks/budget-plan-form/create-budget-plan/use-budget-plan.hook';

export function useBudgetPlanScreenState({ initialData, onSuccess, onCancel }: BudgetPlanFormScreenProps) {
  const { submit, state: saveState, isEdit } = useBudgetPlanForm({ initialData, onSuccess });

  const pageSize = 5;
  const { getPayments, getTotalCount } = useRegularTransactions();

  const {
    options,
    state: listState,
    errorMessage,
    ...paginationRestProps
  } = usePaginationResource({
    pageSize,
    queryKey: ['budget-plan-regular-transactions'],
    getOptionsFn: async (page, pageSize) => {
      const { from, to } = calculateFromAndTo(page, pageSize);
      return getPayments(from, to);
    },
    getTotalCountFn: async () => {
      const count = await getTotalCount();
      return count ?? 0;
    },
    clearCacheOnDestroy: true,
  });

  const state = useCombineStates(saveState, listState);

  return {
    state,
    listState,
    options,
    errorMessage,
    paginationRestProps,
    pageSize,
    isEdit,
    onCancel,
    submit,
  };
}
