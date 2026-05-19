'use client';

import { useCallback, useState } from 'react';
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { FinPagination } from '@frontend/components/pagination/fin-pagination';
import { FinListScreenHandler } from '@frontend/components/screen-handlers/fin-list-screen-handler';
import { FinListPageWrapper } from '@frontend/components/wrappers/fin-list-page-wrapper';
import { FinListWrapper } from '@frontend/components/wrappers/fin-list-wrapper';
import { FinButtonListAction } from '@frontend/components/wrappers/fin-button-list-action';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { calculateFromAndTo } from '@common/utils/calculate-from-and-to.util';
import { getFirstErrorMessage } from '@frontend/shared/utils/get-first-error-message.util';
import { useRegularTransactions } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';
import { SelectableRegularCard } from '@frontend/entities/operations/income-expense-card/selectable-card/selectable-regular-card';
import { IncomeExpenseCard } from '@frontend/entities/operations/income-expense-card/card/income-expense-card';
import { AddOperationButton } from '@frontend/entities/operations/add-unregular-operation-button/add-unregular-operation-button';

type MonthOperation = React.ComponentProps<typeof IncomeExpenseCard> & {
  id: number;
};

interface BudgetPlanFormScreenProps {
  initialSelectedIds?: number[];
  initialMonthOperations?: MonthOperation[];
  onSuccess: (selectedIds: number[], monthOperations: MonthOperation[]) => void;
  onCancel: () => void;
  onAddMonthOperation: (onCreate: (op: Omit<MonthOperation, 'id'>) => void) => void;
}

export function BudgetPlanFormScreen({
  initialSelectedIds = [],
  initialMonthOperations = [],
  onSuccess,
  onCancel,
  onAddMonthOperation,
}: BudgetPlanFormScreenProps) {
  const pageSize = 5;
  const { getPayments, getTotalCount } = useRegularTransactions();

  const [selectedIds, setSelectedIds] = useState<Set<number>>(() => new Set(initialSelectedIds));

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

  const handleToggle = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const [monthOperations, setMonthOperations] = useState<MonthOperation[]>(initialMonthOperations);
  const [tempIdCounter, setTempIdCounter] = useState(-1);

  const handleAddOperation = () => {
    onAddMonthOperation((op) => {
      setMonthOperations((prev) => [...prev, { ...op, id: tempIdCounter }]);
      setTempIdCounter((c) => c - 1);
    });
  };

  const handleDeleteMonthOperation = useCallback((id: number) => {
    setMonthOperations((prev) => prev.filter((op) => op.id !== id));
  }, []);

  const hasAnySelected = selectedIds.size > 0;

  const handleSubmit = () => {
    onSuccess(Array.from(selectedIds), monthOperations);
  };

  return (
    <FinListPageWrapper>
      <div className="flex-none flex items-center justify-between p-4">
        <div>
          <p className="text-xl">
            <b>Бюджетний план</b>
          </p>
          <p className="text-sm text-muted-foreground mt-0.5">Оберіть регулярні операції для включення в план</p>
        </div>
        {hasAnySelected && <span className="text-sm text-muted-foreground">Вибрано: {selectedIds.size}</span>}
      </div>
      <div className="flex-1 overflow-y-auto min-h-0">
        <FinListWrapper state={listState}>
          <FinListScreenHandler
            state={listState}
            errorMessage={getFirstErrorMessage(errorMessage)}
            hasData={!!options.length}
            skeletonItems={pageSize}
            skeletonClassName="min-h-72"
          >
            {options.map((item) => (
              <SelectableRegularCard
                key={item.id}
                item={item}
                selected={selectedIds.has(item.id)}
                onToggle={handleToggle}
                dimmed={hasAnySelected && !selectedIds.has(item.id)}
              />
            ))}
          </FinListScreenHandler>
        </FinListWrapper>

        <FinPagination
          className="pt-3"
          {...paginationRestProps}
          pageSize={pageSize}
        />

        <div className="flex-none px-4 pt-6 pb-2">
          <p className="text-base font-semibold">Операції цього місяця</p>
          <p className="text-sm text-muted-foreground mt-0.5">Разові доходи та витрати поза регулярними</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-4">
          {monthOperations.map((op) => (
            <IncomeExpenseCard
              key={op.id}
              {...op}
              handleDelete={handleDeleteMonthOperation}
            />
          ))}

          <AddOperationButton onClick={handleAddOperation} />
        </div>
      </div>

      <FinButtonListAction>
        <UiButton
          isOutlined
          size="lg"
          onClick={onCancel}
        >
          Скасувати
        </UiButton>
        <UiButton
          variant="primary"
          size="lg"
          disabled={!hasAnySelected}
          onClick={handleSubmit}
        >
          Зберегти план ({selectedIds.size})
        </UiButton>
      </FinButtonListAction>
    </FinListPageWrapper>
  );
}
