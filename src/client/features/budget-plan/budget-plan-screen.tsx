'use client';

import { useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FinListPageWrapper } from '@frontend/components/wrappers/fin-list-page-wrapper';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { IncomeExpenseCard } from '@frontend/entities/operations/income-expense-card/card/income-expense-card';
import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import { TransactionCard } from '@frontend/entities/operations/transaction-card/transaction-card';
import { TypeEntry } from '@common/enums/entry.enum';
import {
  BudgetPlanStatisticDesktop,
  BudgetPlanStatisticMobile,
} from '@frontend/features/budget-plan/components/budget-plan-statistic-block';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { isCurrentMonth } from '@common/domains/budget-plan/is-current-month.util';

interface BudgetPlanViewScreenProps {
  budgetPlan: BudgetPlanDetailed;
}

export function BudgetPlanScreen({ budgetPlan }: BudgetPlanViewScreenProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const EntryCard = isMobile ? TransactionCard : IncomeExpenseCard;
  const StatisticBlock = isMobile ? BudgetPlanStatisticMobile : BudgetPlanStatisticDesktop;

  const canEdit = isCurrentMonth({ month: budgetPlan.month, year: budgetPlan.year });

  const visibleOtherEntries = useMemo(
    () => budgetPlan.otherEntries.filter((e) => e.selected),
    [budgetPlan.otherEntries],
  );

  const isEmpty = budgetPlan.plannedRegularEntries.length === 0 && visibleOtherEntries.length === 0;

  const { income, expense } = useMemo(() => {
    const allEntries = [...budgetPlan.plannedRegularEntries, ...visibleOtherEntries];
    return {
      income: allEntries.filter((e) => e.type === TypeEntry.Income).reduce((acc, e) => acc + e.sum, 0),
      expense: allEntries.filter((e) => e.type === TypeEntry.Expense).reduce((acc, e) => acc + e.sum, 0),
    };
  }, [budgetPlan.plannedRegularEntries, visibleOtherEntries]);

  return (
    <FinListPageWrapper>
      <div className="flex-none flex items-center justify-between p-4">
        <div>
          <p className="text-xl">
            <b>Бюджетний план</b>
          </p>
          <p className="text-sm text-muted-foreground mt-0.5">
            Регулярних операцій: {budgetPlan.plannedRegularEntries.length} · Разових: {visibleOtherEntries.length}
          </p>
        </div>
        {canEdit && (
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
        )}
      </div>

      <div className="px-4 pb-2 flex-none">
        <StatisticBlock
          income={income}
          expense={expense}
        />
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {isEmpty && (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <p className="text-muted-foreground text-sm">План порожній</p>
          </div>
        )}

        {budgetPlan.plannedRegularEntries.length > 0 && (
          <>
            <div className="flex-none px-4 pb-2 flex items-center justify-between">
              <p className="text-base font-semibold">Регулярні операції</p>
              <div className="flex items-center gap-1">
                <p className="text-sm text-muted-foreground">{budgetPlan.plannedRegularEntries.length}</p>
                <UiIconButton
                  icon="chevron-right"
                  size="default"
                  variant="muted-foreground"
                  borderNone
                  aria-label="Перейти до регулярних операцій"
                  onClick={() => router.push('/profile/budget/regular-operations')}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-4">
              {budgetPlan.plannedRegularEntries.map((entry) => (
                <EntryCard
                  key={entry.id}
                  {...entry}
                  showActions={false}
                />
              ))}
            </div>
          </>
        )}

        {visibleOtherEntries.length > 0 && (
          <>
            <div className="flex-none px-4 pt-6 pb-2">
              <p className="text-base font-semibold">Операції цього місяця</p>
              <p className="text-sm text-muted-foreground mt-0.5">Разові доходи та витрати поза регулярними</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-4 pb-4">
              {visibleOtherEntries.map((entry) => (
                <EntryCard
                  key={entry.id}
                  {...entry}
                  showActions={false}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </FinListPageWrapper>
  );
}
