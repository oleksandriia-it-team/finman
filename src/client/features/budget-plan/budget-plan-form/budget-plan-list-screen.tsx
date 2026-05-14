'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MonthTitles } from 'src/common/constants/month-titles.constant';
import { getCurrentMonthDate } from 'src/common/domains/budget-plan/get-current-month-date-util';
import { TypeEntryFilter } from 'src/common/enums/entry.enum';
import { FinButtonListAction } from 'src/client/shared/components/wrappers/fin-button-list-action';
import { FinListPageWrapper } from 'src/client/shared/components/wrappers/fin-list-page-wrapper';
import { FinListScreenHandler } from 'src/client/shared/components/screen-handlers/fin-list-screen-handler';
import { FinLoader } from 'src/client/shared/components/loader/fin-loader';
import { BudgetPlanEntrySection } from 'src/client/entities/budget-plan/ui/budget-plan-entry-section';
import { useBudgetPlanCurrentMonth } from 'src/client/features/budget-plan/hooks/use-budget-plan-current-month.hook';
import {
  PlanOperationsStatisticDesktop,
  PlanOperationsStatisticMobile,
} from '../budget-plan-block/plan-operations-statistic-block';
import { TrackingOperationTypeFilter } from 'src/client/entities/operations/tracking-type-picker/tracking-operation-type-filter';
import { PromiseState } from 'src/client/shared/enums/promise-state.enum';
import { UiButton } from 'src/client/shared/ui/ui-button/ui-button';
import { UiCard } from 'src/client/shared/ui/ui-card/ui-card';
import { UiSvgIcon } from 'src/client/shared/ui/ui-svg-icon/ui-svg-icon';

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

export function BudgetPlanListScreen() {
  const router = useRouter();
  const currentDate = useMemo(() => getCurrentMonthDate(), []);
  const { data: budgetPlan, status, error } = useBudgetPlanCurrentMonth();
  const [typeFilter, setTypeFilter] = useState<TypeEntryFilter>(TypeEntryFilter.All);

  const promiseState = useMemo(() => {
    if (status === 'pending') return PromiseState.Loading;
    if (status === 'error') return PromiseState.Error;
    return PromiseState.Success;
  }, [status]);

  const plannedRegularEntries = budgetPlan?.plannedRegularEntries ?? [];
  const otherEntries = budgetPlan?.otherEntries ?? [];
  const isLoading = status === 'pending';

  const totalIncome = sumEntriesByType(plannedRegularEntries, 'income') + sumEntriesByType(otherEntries, 'income');
  const totalExpense = sumEntriesByType(plannedRegularEntries, 'expense') + sumEntriesByType(otherEntries, 'expense');
  const balance = totalIncome - totalExpense;

  const filteredRegular = plannedRegularEntries.filter((entry) => {
    if (typeFilter === TypeEntryFilter.All) return true;
    return (entry.type as string) === typeFilter;
  });

  const filteredOther = otherEntries.filter((entry) => {
    if (typeFilter === TypeEntryFilter.All) return true;
    return (entry.type as string) === typeFilter;
  });

  return (
    <FinListPageWrapper>
      <div className="flex-1 overflow-y-auto bg-[#eef3ff] px-4 pb-28 pt-6 md:px-8 md:pb-10 md:pt-7">
        <div className="mx-auto max-w-7xl space-y-5">
          <div className="space-y-3 md:hidden">
            <h1 className="text-4xl font-bold leading-none text-slate-950">Бюджетний план</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <UiSvgIcon
                name="calendar"
                size="sm"
              />
              <span className="text-base">Поточний план</span>
            </div>
            <p className="text-3xl font-bold leading-tight text-slate-950">
              {MonthTitles[currentDate.month]} {currentDate.year}
            </p>
          </div>

          <div className="hidden items-start justify-between gap-4 md:flex">
            <div>
              <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                <UiSvgIcon
                  name="calendar"
                  size="sm"
                />
                <span className="text-sm">Поточний план</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-950">
                {MonthTitles[currentDate.month]} {currentDate.year}
              </h1>
            </div>

            {budgetPlan && (
              <div className="flex shrink-0 items-center gap-3 pt-1">
                <UiButton
                  size="sm"
                  className="gap-1.5 rounded-2xl px-4 py-5 text-sm"
                  onClick={() => router.push('/profile/budget/plans/edit')}
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

                <div className="hidden md:block">
                  <TrackingOperationTypeFilter
                    active={typeFilter}
                    onSelect={setTypeFilter}
                  />
                </div>

                {filteredRegular.length > 0 && (
                  <BudgetPlanEntrySection
                    entries={filteredRegular.map((entry) => ({
                      id: entry.id,
                      title: entry.title,
                      type: entry.type as 'income' | 'expense',
                      sum: entry.sum,
                      category: entry.category,
                      description: entry.description,
                    }))}
                    title="Регулярні операції"
                    iconName="refresh-cw"
                    countLabel={`${plannedRegularEntries.length} активні`}
                    frequencyLabel="Щомісяця"
                  />
                )}

                {filteredOther.length > 0 && (
                  <BudgetPlanEntrySection
                    entries={filteredOther.map((entry) => ({
                      id: entry.id,
                      title: entry.title,
                      type: entry.type as 'income' | 'expense',
                      sum: entry.sum,
                      category: entry.category,
                      description: entry.description,
                    }))}
                    title="Лише цього місяця"
                    iconName="calendar-days"
                    countLabel={`${otherEntries.length} записів`}
                    frequencyLabel="Одноразово"
                  />
                )}

                {filteredRegular.length === 0 && filteredOther.length === 0 && (
                  <UiCard className="rounded-4xl border border-dashed border-border bg-card/70 px-4 py-10 text-center text-muted-foreground shadow-none">
                    Немає операцій за обраним фільтром
                  </UiCard>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-12">
                <p className="text-center text-lg text-muted-foreground">Бюджетний план на цей місяць ще не створено</p>
                <UiButton
                  variant="primary"
                  size="lg"
                  onClick={() => router.push('/profile/budget/plans/edit')}
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
            onClick={() => router.push('/profile/budget/plans/edit')}
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
