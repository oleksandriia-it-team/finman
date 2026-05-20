'use client';

import { useRouter, usePathname } from 'next/navigation';
import { FinListPageWrapper } from '@frontend/components/wrappers/fin-list-page-wrapper';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { IncomeExpenseCard } from '@frontend/entities/operations/income-expense-card/card/income-expense-card';
import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import { TransactionCard } from '@frontend/entities/operations/transaction-card/transaction-card';

interface BudgetPlanViewScreenProps {
  budgetPlan: BudgetPlanDetailed;
}

export function BudgetPlanScreen({ budgetPlan }: BudgetPlanViewScreenProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const isEmpty = budgetPlan.plannedRegularEntries.length === 0 && budgetPlan.otherEntries.length === 0;

  return (
    <FinListPageWrapper>
      <div className="flex-none flex items-center justify-between p-4">
        <div>
          <p className="text-xl">
            <b>Бюджетний план</b>
          </p>
          <p className="text-sm text-muted-foreground mt-0.5">
            Регулярних операцій: {budgetPlan.plannedRegularEntries.length} · Разових: {budgetPlan.otherEntries.length}
          </p>
        </div>
        <UiButton
          variant="primary"
          isOutlined
          size="sm"
          className="gap-1.5"
          onClick={() => router.push(`${pathname}/edit`)}
        >
          <UiSvgIcon
            name="pencil"
            size="xs"
          />
          Редагувати
        </UiButton>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {isEmpty && (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <p className="text-muted-foreground text-sm">План порожній</p>
          </div>
        )}

        {budgetPlan.plannedRegularEntries.length > 0 && (
          <>
            <div className="flex-none px-4 pb-2">
              <p className="text-base font-semibold">Регулярні операції</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-4">
              {budgetPlan.plannedRegularEntries.map((entry) =>
                isMobile ? (
                  <TransactionCard
                    key={entry.id}
                    {...entry}
                    showActions={false}
                  />
                ) : (
                  <IncomeExpenseCard
                    key={entry.id}
                    {...entry}
                    actions={false}
                  />
                ),
              )}
            </div>
          </>
        )}

        {budgetPlan.otherEntries.length > 0 && (
          <>
            <div className="flex-none px-4 pt-6 pb-2">
              <p className="text-base font-semibold">Операції цього місяця</p>
              <p className="text-sm text-muted-foreground mt-0.5">Разові доходи та витрати поза регулярними</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-4 pb-4">
              {budgetPlan.otherEntries.map((entry) =>
                isMobile ? (
                  <TransactionCard
                    key={entry.id}
                    {...entry}
                    showActions={false}
                  />
                ) : (
                  <IncomeExpenseCard
                    key={entry.id}
                    {...entry}
                    actions={false}
                  />
                ),
              )}
            </div>
          </>
        )}
      </div>
    </FinListPageWrapper>
  );
}
