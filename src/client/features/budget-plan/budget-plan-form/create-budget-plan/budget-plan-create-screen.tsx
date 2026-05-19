'use client';

import { FinPagination } from '@frontend/components/pagination/fin-pagination';
import { FinListScreenHandler } from '@frontend/components/screen-handlers/fin-list-screen-handler';
import { FinListPageWrapper } from '@frontend/components/wrappers/fin-list-page-wrapper';
import { FinListWrapper } from '@frontend/components/wrappers/fin-list-wrapper';
import { FinButtonListAction } from '@frontend/components/wrappers/fin-button-list-action';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { getFirstErrorMessage } from '@frontend/shared/utils/get-first-error-message.util';
import { SelectableRegularCard } from '@frontend/entities/operations/income-expense-card/selectable-card/selectable-regular-card';
import { IncomeExpenseCard } from '@frontend/entities/operations/income-expense-card/card/income-expense-card';
import { AddOperationButton } from '@frontend/entities/operations/add-unregular-operation-button/add-unregular-operation-button';
import type { BudgetPlanFormScreenProps } from '@frontend/features/budget-plan/budget-plan-form/create-budget-plan/budget-plan-create-screen-props';
import { useBudgetPlanScreenState } from '@frontend/features/budget-plan/hooks/budget-plan-form/use-budget-plan-screen-state';

export function BudgetPlanFormScreen(props: BudgetPlanFormScreenProps) {
  const {
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
  } = useBudgetPlanScreenState(props);

  return (
    <FinListPageWrapper>
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
          {isEdit ? 'Оновити план' : `Зберегти план (${selectedIds.size})`}
        </UiButton>
      </FinButtonListAction>
    </FinListPageWrapper>
  );
}
