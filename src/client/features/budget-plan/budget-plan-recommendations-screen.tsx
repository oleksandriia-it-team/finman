'use client';

import { FinListPageWrapper } from '@frontend/components/wrappers/fin-list-page-wrapper';
import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import { UiCard } from '@frontend/ui/ui-card/ui-card';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiIconBadge } from '@frontend/ui/ui-icon-badge/ui-icon-badge';
import { cn } from '@frontend/shared/utils/cn.util';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import type { Month } from '@common/enums/month.enum';
import type { MonthEntry } from '@common/records/month-entry.record';
import type { RegularEntry } from '@common/records/regular-entry.record';
import { MonthTitles } from '@common/constants/month-titles.constant';
import { SelectableTransactionCard } from '@frontend/entities/operations/selectable-card/selectable-transaction-card/selectable-transaction-card';
import { SelectableRegularCard } from '@frontend/entities/operations/selectable-card/selectable-regular-card/selectable-regular-card';
import { UiStatusBadge } from '@frontend/ui/ui-status-badge/ui-status-badge';
import { getPriorityBadge } from '@frontend/features/budget-plan/utils/get-priority-badge.util';
import { useBudgetPlanRecommendations } from '@frontend/features/budget-plan/hooks/use-budget-plan-recommendations.hook';

interface BudgetPlanRecommendationsScreenProps {
  month: Month;
  year: number;
  plannedRegularEntries: RegularEntry[];
  otherEntries: MonthEntry[];
  isEdit: boolean;
  onApply: () => void;
}

export function BudgetPlanRecommendationsScreen({
  month,
  year,
  plannedRegularEntries,
  otherEntries,
  isEdit,
  onApply,
}: BudgetPlanRecommendationsScreenProps) {
  const isMobile = useIsMobile();

  const {
    expenseEntries,
    selectedToKeep,
    toggleEntry,
    totalIncome,
    totalExpenses,
    selectedSavings,
    newExpenses,
    savingsPercent,
    removedCount,
    totalCount,
    applyState,
    apply,
    skip,
    applyOptimal,
  } = useBudgetPlanRecommendations({ plannedRegularEntries, otherEntries, isEdit, onApply });

  const monthLabel = `${MonthTitles[month]} ${year}`;
  const isApplying = applyState === PromiseState.Loading;
  const CardComponent = isMobile ? SelectableTransactionCard : SelectableRegularCard;

  return (
    <FinListPageWrapper>
      <div className="flex-none px-4 pt-4 pb-2">
        <p className="text-sm text-muted-foreground mb-1">{monthLabel}</p>
        <p className="text-2xl font-bold">Рекомендації</p>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 px-4 flex flex-col gap-4 pb-4">
        <UiCard className="rounded-3xl px-4 py-4 gap-0">
          <div className="flex flex-row justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground text-xs">Загальний дохід</p>
              <FinTransformCurrency
                value={totalIncome}
                className="font-bold text-base text-success"
              />
            </div>
            <div className="flex flex-col gap-1 items-end">
              <p className="text-muted-foreground text-xs">Поточні витрати</p>
              <FinTransformCurrency
                value={totalExpenses}
                className="font-bold text-base text-destructive-foreground"
              />
            </div>
          </div>

          <div className="border-t border-border my-3" />

          <div className="flex flex-row justify-between gap-4 items-center">
            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground text-xs">Економія</p>
              <FinTransformCurrency
                value={selectedSavings}
                className="font-bold text-base text-success"
              />
            </div>
            {savingsPercent > 0 && (
              <UiStatusBadge
                label={`-${savingsPercent}%`}
                variant="success"
              />
            )}
          </div>

          <div className="border-t border-border my-3" />

          <div className="flex items-center gap-2">
            <UiIconBadge
              name="piggy-bank"
              variant="primary-muted"
              size="default"
              isRoundedFull
            />
            <div className="flex flex-col gap-0.5">
              <p className="text-muted-foreground text-xs">Нові витрати</p>
              <FinTransformCurrency
                value={newExpenses}
                className="font-bold text-base text-primary"
              />
            </div>
          </div>

          <div className="border-t border-border my-3" />

          <div className="flex items-center gap-2">
            <UiIconBadge
              name="trash3"
              variant="primary-muted"
              size="default"
              isRoundedFull
            />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{removedCount}</span>
              {' з '}
              <span className="font-semibold text-foreground">{totalCount}</span>
              {' витрат буде видалено'}
            </p>
          </div>
        </UiCard>

        {expenseEntries.length > 0 ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold">Пропозиції</p>
              <UiButton
                variant="primary"
                isOutlined
                size="sm"
                disabled={isApplying}
                onClick={applyOptimal}
              >
                Оптимальний план
              </UiButton>
            </div>

            <div className={isMobile ? 'flex flex-col gap-2' : 'grid grid-cols-2 lg:grid-cols-3 gap-3'}>
              {expenseEntries.map((entry) => {
                const priorityBadge = getPriorityBadge(entry.priority);
                return (
                  <CardComponent
                    key={entry.id}
                    item={{
                      ...entry,
                      description: 'витрата · одноразово',
                      badge: (
                        <UiStatusBadge
                          label={priorityBadge.label}
                          variant={priorityBadge.variant}
                        />
                      ),
                    }}
                    selected={selectedToKeep.has(entry.id)}
                    onToggle={toggleEntry}
                    dimmed={!selectedToKeep.has(entry.id)}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 gap-2">
            <p className="text-muted-foreground text-sm text-center">Немає одноразових витрат для оптимізації</p>
          </div>
        )}
      </div>

      <div className="flex-none px-4 pb-3 sm:pb-4 pt-2 flex gap-3">
        <UiButton
          variant="default"
          size="default"
          className="flex-1"
          disabled={isApplying}
          onClick={() => skip()}
        >
          Пропустити
        </UiButton>
        <UiButton
          variant="primary"
          size="default"
          className={cn('flex-1', removedCount === 0 && 'opacity-50')}
          disabled={isApplying}
          onClick={() => apply()}
        >
          {isApplying ? 'Збереження...' : 'Зберегти'}
        </UiButton>
      </div>
    </FinListPageWrapper>
  );
}
