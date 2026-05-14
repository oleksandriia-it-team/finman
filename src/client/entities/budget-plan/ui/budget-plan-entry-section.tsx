'use client';

import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import type { BudgetPlanEntrySectionProps } from '@frontend/entities/budget-plan/ui/props/budget-plan-entry-section.props';
import { CategoriesMapping } from '@frontend/shared/styles/card-styles-mappings';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiConfirmModal } from '@frontend/components/confirm-modal/fin-confirm-modal';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiCard } from '@frontend/ui/ui-card/ui-card';
import { UiIconBadge } from '@frontend/ui/ui-icon-badge/ui-icon-badge';
import { UiInfoBlock } from '@frontend/ui/ui-info-block/ui-info-block';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

const entrySectionStyles = {
  card: 'rounded-4xl border border-white/70 bg-white px-4 py-4 shadow-lg',
  selectableCard:
    'cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(148,163,184,0.2)]',
  deleteButton: 'size-8 text-slate-500 hover:text-destructive',
} as const;

export function BudgetPlanEntrySection({
  entries,
  iconName,
  iconClassName,
  title,
  showSelectedBadge = false,
  countLabel,
  frequencyLabel,
  selectable = false,
  onToggleSelect,
  onDelete,
  gridClassName,
}: Readonly<BudgetPlanEntrySectionProps>) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <UiIconBadge
            name={iconName}
            variant={iconName === 'calendar-days' ? 'warning-muted' : 'primary-muted'}
            size="lg"
            isRoundedFull
            className={iconClassName}
          />
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        </div>

        {countLabel && <span className="hidden text-sm text-slate-500 md:block">{countLabel}</span>}
      </div>

      <div className={cn('grid grid-cols-1 gap-3 md:grid-cols-3', gridClassName)}>
        {entries.map((entry) => {
          const category = entry.category ?? 'expense-misc';
          const categoryStyles = CategoriesMapping[category];
          const isIncome = entry.type === 'income';
          const description = `${isIncome ? 'Дохід' : 'Витрата'} • ${frequencyLabel ?? categoryStyles.label}`;

          return (
            <UiCard
              key={entry.id}
              className={cn(entrySectionStyles.card, selectable && entrySectionStyles.selectableCard)}
              onClick={selectable ? () => onToggleSelect?.(entry.id) : undefined}
            >
              <div className="flex items-center gap-3 md:hidden">
                {selectable && (
                  <div
                    className={cn(
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors',
                      entry.selected
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-slate-200 bg-slate-100 text-transparent',
                    )}
                  >
                    <UiSvgIcon
                      name="check"
                      size="sm"
                    />
                  </div>
                )}

                <UiInfoBlock
                  icon={categoryStyles.icon}
                  title={entry.title}
                  description={description}
                  category={category}
                  size="lg"
                  isIconRoundedFull
                  className="min-w-0 flex-1 p-0"
                  bgClassName="bg-transparent"
                />

                <div className="flex shrink-0 items-center gap-2">
                  <p
                    className={cn(
                      'whitespace-nowrap text-lg font-bold md:text-base',
                      isIncome ? 'text-success' : 'text-destructive',
                    )}
                  >
                    {isIncome ? '+ ' : '- '}
                    <FinTransformCurrency value={entry.sum ?? 0} />
                  </p>

                  {onDelete && (
                    <UiConfirmModal
                      title="Видалити операцію?"
                      description="Операція буде прибрана з плану цього місяця."
                      confirmLabel="Видалити"
                      cancelLabel="Скасувати"
                      confirmVariant="destructive"
                      onConfirm={() => onDelete(entry.id)}
                      trigger={
                        <UiButton
                          type="button"
                          aria-label="Видалити"
                          variant="destructive-muted"
                          size="sm"
                          className={entrySectionStyles.deleteButton}
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                        >
                          <UiSvgIcon
                            name="trash"
                            size="sm"
                          />
                        </UiButton>
                      }
                    />
                  )}
                </div>
              </div>

              <div className="hidden md:flex md:flex-col md:gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    {selectable && (
                      <div
                        className={cn(
                          'mt-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors',
                          entry.selected
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-slate-200 bg-slate-100 text-transparent',
                        )}
                      >
                        <UiSvgIcon
                          name="check"
                          size="sm"
                        />
                      </div>
                    )}

                    <UiInfoBlock
                      icon={categoryStyles.icon}
                      title={entry.title}
                      description={description}
                      category={category}
                      size="lg"
                      isIconRoundedFull
                      className="min-w-0 flex-1 items-start p-0"
                      bgClassName="bg-transparent"
                    />
                  </div>

                  {onDelete && (
                    <UiConfirmModal
                      title="Видалити операцію?"
                      description="Операція буде прибрана з плану цього місяця."
                      confirmLabel="Видалити"
                      cancelLabel="Скасувати"
                      confirmVariant="destructive"
                      onConfirm={() => onDelete(entry.id)}
                      trigger={
                        <UiButton
                          type="button"
                          aria-label="Видалити"
                          variant="destructive-muted"
                          size="sm"
                          className={entrySectionStyles.deleteButton}
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                        >
                          <UiSvgIcon
                            name="trash"
                            size="sm"
                          />
                        </UiButton>
                      }
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <p
                    className={cn(
                      'text-xl font-bold leading-none md:text-lg',
                      isIncome ? 'text-success' : 'text-destructive',
                    )}
                  >
                    {isIncome ? '+ ' : '- '}
                    <FinTransformCurrency value={entry.sum ?? 0} />
                  </p>

                  {showSelectedBadge && entry.selected && (
                    <span className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                      До оптимізації
                    </span>
                  )}
                </div>
              </div>
            </UiCard>
          );
        })}
      </div>
    </div>
  );
}
