'use client';

import { useCallback, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { RegularEntry } from '@common/records/regular-entry.record';
import { FinPagination } from '@frontend/components/pagination/fin-pagination';
import { FinListScreenHandler } from '@frontend/components/screen-handlers/fin-list-screen-handler';
import { FinListPageWrapper } from '@frontend/components/wrappers/fin-list-page-wrapper';
import { FinListWrapper } from '@frontend/components/wrappers/fin-list-wrapper';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { IncomeExpenseCard } from '@frontend/entities/operations/income-expense-card/card/income-expense-card';
import { TransactionCard } from '@frontend/entities/operations/transaction-card/transaction-card';
import { AddOperationButton } from '@frontend/entities/operations/add-unregular-operation-button/add-unregular-operation-button';
import type { BudgetPlanFormScreenProps } from '@frontend/features/budget-plan/budget-plan-form/create-budget-plan/budget-plan-create-screen-props';
import { useBudgetPlanScreenState } from '@frontend/features/budget-plan/hooks/budget-plan-form/use-budget-plan-screen-state';
import { useBudgetPlanDraftStore } from '@frontend/features/budget-plan/hooks/budget-plan-draft';
import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import { useRegularTransactions } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';
import { SelectableTransactionCard } from '@frontend/entities/operations/selectable-card/selectable-transaction-card/selectable-transaction-card';
import { SelectableRegularCard } from '@frontend/entities/operations/selectable-card/selectable-regular-card/selectable-regular-card';

export function BudgetPlanFormScreen(props: BudgetPlanFormScreenProps) {
  const { state, options, appError, paginationRestProps, isEdit, onCancel, pageSize, listState } =
    useBudgetPlanScreenState(props);

  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const SelectableCard = isMobile ? SelectableTransactionCard : SelectableRegularCard;
  const EntryCard = isMobile ? TransactionCard : IncomeExpenseCard;

  const { selectedIds, monthOperations, toggleSelectedId, deleteMonthOperation, setPlannedRegularEntries, resetDraft } =
    useBudgetPlanDraftStore();

  const { getById } = useRegularTransactions();

  const [isLoadingNext, setIsLoadingNext] = useState(false);

  const hasAnySelected = selectedIds.size > 0;

  const handleToggle = useCallback((id: number) => toggleSelectedId(id), [toggleSelectedId]);

  const handleDeleteMonthOperation = useCallback((id: number) => deleteMonthOperation(id), [deleteMonthOperation]);

  const handleAddOperation = () => {
    router.push(`${pathname}/month-entry`);
  };

  const handleSubmit = async () => {
    setIsLoadingNext(true);
    try {
      const entries = await Promise.all(Array.from(selectedIds).map((id) => getById(id)));
      const validEntries = entries.filter((e): e is RegularEntry => e !== null);
      setPlannedRegularEntries(validEntries);
      props.onSuccess?.();
    } finally {
      setIsLoadingNext(false);
    }
  };

  const handleCancel = () => {
    resetDraft();
    onCancel();
  };

  return (
    <FinListPageWrapper className="pb-0 sm:pb-8">
      <div className="flex-none flex items-center justify-between p-4">
        <div>
          <p className="text-xl">
            <b>{isEdit ? 'Редагувати план' : 'Бюджетний план'}</b>
          </p>
          <p className="text-sm text-muted-foreground mt-0.5">Оберіть регулярні операції для включення в план</p>
        </div>
        {hasAnySelected && <span className="text-sm text-muted-foreground">Вибрано: {selectedIds.size}</span>}
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        <FinListWrapper state={listState}>
          <FinListScreenHandler
            state={state}
            appError={appError}
            hasData={!!options.length}
            skeletonItems={pageSize}
            skeletonClassName="min-h-72"
          >
            {options.map((item) => (
              <SelectableCard
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
            <EntryCard
              key={op.id}
              {...op}
              deletable
              handleDelete={handleDeleteMonthOperation}
            />
          ))}
          <AddOperationButton onClick={handleAddOperation} />
        </div>
      </div>

      <div className="flex-none px-4 pb-3 sm:pb-4 pt-2 flex gap-3">
        <UiButton
          variant="default"
          size="default"
          className="flex-1"
          onClick={handleCancel}
        >
          Скасувати
        </UiButton>
        <UiButton
          variant="primary"
          size="default"
          className="flex-1"
          disabled={!hasAnySelected || isLoadingNext}
          onClick={handleSubmit}
        >
          {isLoadingNext ? 'Завантаження...' : `Далі (${selectedIds.size})`}
        </UiButton>
      </div>
    </FinListPageWrapper>
  );
}
