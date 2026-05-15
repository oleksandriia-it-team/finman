// src/client/features/budget-plan/budget-plan-form/budget-plan-list-screen.tsx
'use client';

import { useRouter } from 'next/navigation';
import { FinButtonListAction } from 'src/client/shared/components/wrappers/fin-button-list-action';
import { FinListPageWrapper } from 'src/client/shared/components/wrappers/fin-list-page-wrapper';
import { FinListScreenHandler } from 'src/client/shared/components/screen-handlers/fin-list-screen-handler';
import { FinLoader } from 'src/client/shared/components/loader/fin-loader';
import { BudgetPlanEntrySection } from 'src/client/entities/budget-plan/ui/budget-plan-entry-section';
import { useBudgetPlanByDate } from 'src/client/features/budget-plan/hooks/use-budget-plan-by-date.hook';
import {
  PlanOperationsStatisticDesktop,
  PlanOperationsStatisticMobile,
} from '../budget-plan-block/plan-operations-statistic-block';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { UiButton } from 'src/client/shared/ui/ui-button/ui-button';
import { UiCard } from 'src/client/shared/ui/ui-card/ui-card';
import { UiSvgIcon } from 'src/client/shared/ui/ui-svg-icon/ui-svg-icon';
import { CurrentPlanHeader } from '@frontend/features/budget-plan/current-plan-header-date';
import type { GetBudgetPlanDto } from '@common/domains/budget-plan/get-budget-plan.schema';

function sumEntriesByType(entries: Array<{ type: string; sum?: number }>, type: 'income' | 'expense') {
  return entries.reduce((acc, entry) => (entry.type === type ? acc + (entry.sum ?? 0) : acc), 0);
}

function BudgetPlanListScreenSkeleton() {
  return (
    <div className="flex h-40 items-center justify-center">
      <FinLoader />
    </div>
  );
}

interface BudgetPlanListScreenProps {
  date: GetBudgetPlanDto;
}

export function BudgetPlanListScreen({ date }: BudgetPlanListScreenProps) {
  const router = useRouter();
  const { data: budgetPlan, status, error } = useBudgetPlanByDate(date);

  const dateId = `${String(date.month + 1).padStart(2, '0')}-${date.year}`;

  const promiseState =
    status === 'pending' ? PromiseState.Loading : status === 'error' ? PromiseState.Error : PromiseState.Success;

  const plannedRegularEntries = budgetPlan?.plannedRegularEntries ?? [];
  const otherEntries = budgetPlan?.otherEntries ?? [];
  const isLoading = status === 'pending';

  const totalIncome = sumEntriesByType(plannedRegularEntries, 'income') + sumEntriesByType(otherEntries, 'income');
  const totalExpense = sumEntriesByType(plannedRegularEntries, 'expense') + sumEntriesByType(otherEntries, 'expense');
  const balance = totalIncome - totalExpense;

  return (
    <FinListPageWrapper>
      <div className="flex-1 overflow-y-auto bg-[#eef3ff] px-4 pb-28 pt-6 md:px-8 md:pb-10 md:pt-7">
        <div className="mx-auto max-w-7xl space-y-5">
          <div className="space-y-3 md:hidden">
            <h1 className="text-4xl font-bold leading-none text-slate-950">Бюджетний план</h1>
            <CurrentPlanHeader
              month={date.month}
              year={date.year}
            />
          </div>

          <div className="hidden items-start justify-between gap-4 md:flex">
            <CurrentPlanHeader
              month={date.month}
              year={date.year}
            />

            {budgetPlan && (
              <div className="flex shrink-0 items-center gap-3 pt-1">
                <UiButton
                  size="sm"
                  className="gap-1.5 rounded-2xl px-4 py-5 text-sm"
                  onClick={() => router.push(`/profile/budget/plans/edit/${dateId}`)}
                >
                  <UiSvgIcon
                    name="pencil"
                    size="sm"
                  />
                  Редагування
                </UiButton>

                <UiButton
                  variant="primary"
                  size="sm"
                  className="gap-1.5 rounded-2xl px-4 py-5 text-sm shadow-md"
                  onClick={() => router.push('/profile/budget/plans/add')}
                >
                  <UiSvgIcon
                    name="plus"
                    size="sm"
                  />
                  Додати операцію
                </UiButton>
              </div>
            )}
          </div>

          <FinListScreenHandler
            state={promiseState}
            errorMessage={error instanceof Error ? error.message : 'Помилка завантаження'}
            hasData
            skeletonItems={1}
            skeleton={BudgetPlanListScreenSkeleton}
          >
            {budgetPlan ? (
              <div className="space-y-5">
                <div className="hidden md:block">
                  <PlanOperationsStatisticDesktop
                    income={totalIncome}
                    expense={totalExpense}
                    balance={balance}
                    loading={isLoading}
                  />
                </div>

                <div className="md:hidden">
                  <PlanOperationsStatisticMobile
                    income={totalIncome}
                    expense={totalExpense}
                    balance={balance}
                    loading={isLoading}
                  />
                </div>

                {plannedRegularEntries.length > 0 && (
                  <BudgetPlanEntrySection
                    entries={plannedRegularEntries.map((entry) => ({
                      id: entry.id,
                      title: entry.title,
                      type: entry.type as 'income' | 'expense',
                      sum: entry.sum,
                      category: entry.category,
                      description: entry.description,
                    }))}
                    title="Регулярні операції"
                    iconName="arrow-left-right"
                    countLabel={`${plannedRegularEntries.length} активні`}
                    frequencyLabel="Щомісяця"
                  />
                )}

                {otherEntries.length > 0 && (
                  <BudgetPlanEntrySection
                    entries={otherEntries.map((entry) => ({
                      id: entry.id,
                      title: entry.title,
                      type: entry.type as 'income' | 'expense',
                      sum: entry.sum,
                      category: entry.category,
                      description: entry.description,
                    }))}
                    title="Лише цього місяця"
                    iconName="calendar3"
                    countLabel={`${otherEntries.length} записів`}
                    frequencyLabel="Одноразово"
                  />
                )}

                {plannedRegularEntries.length === 0 && otherEntries.length === 0 && (
                  <UiCard className="rounded-4xl border border-dashed border-border bg-card/70 px-4 py-10 text-center text-muted-foreground shadow-none">
                    Немає операцій у плані
                  </UiCard>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-12">
                <p className="text-center text-lg text-muted-foreground">Бюджетний план на цей місяць ще не створено</p>
                <UiButton
                  variant="primary"
                  size="lg"
                  onClick={() => router.push(`/profile/budget/plans/edit/${dateId}`)}
                >
                  <UiSvgIcon
                    name="pencil"
                    size="sm"
                  />
                  Створити новий бюджетний план
                </UiButton>
              </div>
            )}
          </FinListScreenHandler>
        </div>
      </div>

      {!budgetPlan && (
        <FinButtonListAction>
          <UiButton
            variant="primary"
            size="lg"
            className="rounded-full gap-2 shadow-xl"
            onClick={() => router.push(`/profile/budget/plans/edit/${dateId}`)}
          >
            <UiSvgIcon
              name="plus"
              size="sm"
            />
            Створити
          </UiButton>
        </FinButtonListAction>
      )}
    </FinListPageWrapper>
  );
}

export default BudgetPlanListScreen;
