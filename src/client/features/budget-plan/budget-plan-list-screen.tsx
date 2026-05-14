'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { MonthTitles } from '@common/constants/month-titles.constant';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { FinListPageWrapper } from '@frontend/components/wrappers/fin-list-page-wrapper';
import { FinButtonListAction } from '@frontend/components/wrappers/fin-button-list-action';
import { FinListScreenHandler } from '@frontend/components/screen-handlers/fin-list-screen-handler';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { useBudgetPlanCurrentMonth } from '@frontend/features/budget-plan/hooks/use-budget-plan-current-month.hook';
import {
  TrackingOperationsStatisticDesktop,
  TrackingOperationsStatisticMobile,
} from '@frontend/features/tracking-operation/tracking-operations-statistic-block';
import { TrackingOperationTypeFilter } from '@frontend/entities/operations/tracking-type-picker/tracking-operation-type-filter';
import { TypeEntryFilter } from '@common/enums/entry.enum';
import { CategoriesMapping } from '@frontend/shared/styles/card-styles-mappings';
import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import { UiIconBadge } from '@frontend/ui/ui-icon-badge/ui-icon-badge';
import { UiCard } from '@frontend/ui/ui-card/ui-card';
import { cn } from '@frontend/shared/utils/cn.util';
import type { BudgetPlanEntrySectionItem } from '@frontend/entities/budget-plan/ui/props/budget-plan-entry-section.props';

function sumEntriesByType(entries: Array<{ type: string; sum?: number }>, type: 'income' | 'expense') {
  return entries.reduce((acc, entry) => (entry.type === type ? acc + (entry.sum ?? 0) : acc), 0);
}

function BudgetPlanListScreenSkeleton() {
  return (
    <div className="flex items-center justify-center h-40">
      <FinLoader />
    </div>
  );
}

interface BudgetEntryCardProps {
  entry: BudgetPlanEntrySectionItem;
  isRegular?: boolean;
  showDelete?: boolean;
  onDelete?: (id: number) => void;
}

function BudgetEntryCard({ entry, isRegular = false, showDelete = false, onDelete }: Readonly<BudgetEntryCardProps>) {
  const categoryKey = (entry.category ?? 'expense-misc') as keyof typeof CategoriesMapping;
  const categoryStyles = CategoriesMapping[categoryKey] ?? CategoriesMapping['expense-misc'];
  // entry.type is TypeEntry.Expense | TypeEntry.Income — compare via string literal
  const isIncome = (entry.type as string) === 'income';

  return (
    <UiCard className="rounded-4xl shadow-lg p-4 flex flex-col gap-3 w-full">
      <div className="flex items-start justify-between">
        <UiIconBadge
          variant={categoryStyles.variant}
          name={categoryStyles.icon}
          size="lg"
        />
        {showDelete && onDelete && (
          <button
            type="button"
            onClick={() => onDelete(entry.id)}
            className="text-muted-foreground hover:text-destructive transition-colors"
            aria-label="Видалити"
          >
            <UiSvgIcon
              name="trash-2"
              size="sm"
            />
          </button>
        )}
      </div>

      <div className="min-w-0">
        <p className="font-semibold text-sm line-clamp-1">{entry.title}</p>
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              'text-xs font-medium px-1.5 py-0.5 rounded-full',
              isIncome ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive',
            )}
          >
            {isIncome ? 'Дохід' : 'Витрата'}
          </span>
          <span className="text-xs text-muted-foreground">· {isRegular ? 'Щомісяця' : 'Одноразово'}</span>
        </div>
      </div>

      <p className={cn('font-bold text-lg', isIncome ? 'text-success' : 'text-destructive')}>
        {isIncome ? '+ ' : '- '}
        <FinTransformCurrency value={entry.sum ?? 0} />
      </p>
    </UiCard>
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

  const isLoading = status === 'pending';

  const plannedRegularEntries = budgetPlan?.plannedRegularEntries ?? [];
  const otherEntries = budgetPlan?.otherEntries ?? [];

  const totalIncome = sumEntriesByType(plannedRegularEntries, 'income') + sumEntriesByType(otherEntries, 'income');
  const totalExpense = sumEntriesByType(plannedRegularEntries, 'expense') + sumEntriesByType(otherEntries, 'expense');

  // TypeEntryFilter values are plain strings ('all' | 'income' | 'expense') — safe to compare with entry.type string
  const filteredRegular = plannedRegularEntries.filter((e) => {
    if (typeFilter === TypeEntryFilter.All) return true;
    return (e.type as string) === typeFilter;
  });

  const filteredOther = otherEntries.filter((e) => {
    if (typeFilter === TypeEntryFilter.All) return true;
    return (e.type as string) === typeFilter;
  });

  const regularCount = plannedRegularEntries.length;
  const otherCount = otherEntries.length;

  return (
    <FinListPageWrapper>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <UiSvgIcon
                name="calendar"
                size="sm"
              />
              <span className="text-sm">Поточний план</span>
            </div>
            <h1 className="text-3xl font-bold">
              {MonthTitles[currentDate.month]} {currentDate.year}
            </h1>
          </div>

          {budgetPlan && (
            <div className="flex items-center gap-2 flex-shrink-0 pt-1">
              <UiButton
                size="sm"
                className="gap-1.5"
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
                className="gap-1.5"
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
              <div className="hidden md:flex gap-4">
                <TrackingOperationsStatisticDesktop
                  income={totalIncome}
                  expense={totalExpense}
                  loading={isLoading}
                />
                <UiCard className="rounded-4xl px-4 bg-card flex items-center gap-3 flex-1">
                  <UiIconBadge
                    name="wallet2"
                    variant="primary-muted"
                    size="xl"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-muted-foreground">Баланс</p>
                    <span
                      className={cn(
                        'font-bold text-lg',
                        totalIncome - totalExpense >= 0 ? 'text-success' : 'text-destructive',
                      )}
                    >
                      + <FinTransformCurrency value={totalIncome - totalExpense} />
                    </span>
                  </div>
                </UiCard>
              </div>

              <div className="md:hidden">
                <TrackingOperationsStatisticMobile
                  income={totalIncome}
                  expense={totalExpense}
                  loading={isLoading}
                />
              </div>

              <TrackingOperationTypeFilter
                active={typeFilter}
                onSelect={setTypeFilter}
              />

              {filteredRegular.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UiSvgIcon
                        name="refresh-cw"
                        size="sm"
                        className="text-primary"
                      />
                      <h2 className="text-base font-semibold">Регулярні операції</h2>
                    </div>
                    <span className="text-xs text-muted-foreground">{regularCount} активні</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredRegular.map((entry) => (
                      <BudgetEntryCard
                        key={entry.id}
                        entry={entry}
                        isRegular
                      />
                    ))}
                  </div>
                </div>
              )}

              {filteredOther.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UiSvgIcon
                        name="calendar-days"
                        size="sm"
                        className="text-amber-500"
                      />
                      <h2 className="text-base font-semibold">Лише цього місяця</h2>
                    </div>
                    <span className="text-xs text-muted-foreground">{otherCount} записи</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredOther.map((entry) => (
                      <BudgetEntryCard
                        key={entry.id}
                        entry={entry}
                        isRegular={false}
                        showDelete
                        onDelete={() => router.push('/profile/budget/plans/edit')}
                      />
                    ))}

                    <button
                      type="button"
                      className="rounded-4xl border-2 border-dashed border-border flex items-center justify-center gap-2 p-4 min-h-[120px] text-primary hover:bg-primary/5 transition-colors font-medium text-sm"
                      onClick={() => router.push('/profile/budget/plans/add')}
                    >
                      <UiSvgIcon
                        name="plus"
                        size="sm"
                      />
                      Додати операцію
                    </button>
                  </div>
                </div>
              )}

              {filteredRegular.length === 0 && filteredOther.length === 0 && (
                <p className="text-center text-muted-foreground py-8">Немає операцій за обраним фільтром</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <p className="text-lg text-muted-foreground">Бюджетний план на цей місяць не створено</p>
              <UiButton
                variant="primary"
                size="lg"
                onClick={() => router.push('/profile/budget/plans/create')}
              >
                <UiSvgIcon
                  name="plus"
                  size="sm"
                />
                Створити новий бюджетний план
              </UiButton>
            </div>
          )}
        </FinListScreenHandler>
      </div>

      {!budgetPlan && (
        <FinButtonListAction>
          <UiButton
            variant="primary"
            size="lg"
            className="rounded-full gap-2 shadow-xl"
            onClick={() => router.push('/profile/budget/plans/create')}
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
