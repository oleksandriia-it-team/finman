import { useState, useCallback } from 'react';
import { useCombineStates } from '@frontend/shared/hooks/combine-states/combine-states.hook';
import type {
  BudgetPlanFormScreenProps,
  MonthOperation,
} from '@frontend/features/budget-plan/budget-plan-form/create-budget-plan/budget-plan-create-screen-props';
import { calculateFromAndTo } from '@common/utils/calculate-from-and-to.util';
import { useRegularTransactions } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { useBudgetPlanForm } from '@frontend/features/budget-plan/hooks/budget-plan-form/create-budget-plan/use-budget-plan.hook';

export function useBudgetPlanScreenState(props: BudgetPlanFormScreenProps) {
  const {
    initialData,
    initialSelectedIds = [],
    initialMonthOperations = [],
    onSuccess,
    onAddMonthOperation,
    onCancel,
  } = props;

  const {
    submit,
    state: saveState,
    isEdit,
  } = useBudgetPlanForm({
    initialData,
    onSuccess,
  });

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

  const [selectedIds, setSelectedIds] = useState<Set<number>>(() => new Set(initialSelectedIds));
  const hasAnySelected = selectedIds.size > 0;

  const handleToggle = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const [monthOperations, setMonthOperations] = useState<MonthOperation[]>(initialMonthOperations);
  const [tempIdCounter, setTempIdCounter] = useState(-1);

  const handleAddOperation = useCallback(() => {
    onAddMonthOperation((op) => {
      setMonthOperations((prev) => [...prev, { ...op, id: tempIdCounter }]);
      setTempIdCounter((c) => c - 1);
    });
  }, [onAddMonthOperation, tempIdCounter]);

  const handleDeleteMonthOperation = useCallback((id: number) => {
    setMonthOperations((prev) => prev.filter((op) => op.id !== id));
  }, []);

  const state = useCombineStates(saveState, listState);

  const handleSubmit = useCallback(() => {
    submit({
      plannedRegularEntryIds: Array.from(selectedIds),
      otherEntries: monthOperations,
    });
  }, [submit, selectedIds, monthOperations]);

  return {
    state,
    options,
    errorMessage,
    paginationRestProps,
    selectedIds,
    hasAnySelected,
    monthOperations,
    isEdit,
    onCancel,
    handleToggle,
    handleAddOperation,
    handleDeleteMonthOperation,
    handleSubmit,
    pageSize,
    listState,
  };
}
