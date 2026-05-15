'use client';

import type { BudgetPlanEntrySectionProps } from '@frontend/entities/budget-plan/ui/props/budget-plan-entry-section.props';
import type { TypeEntry } from '@common/enums/entry.enum';
import { UiIconBadge } from '@frontend/ui/ui-icon-badge/ui-icon-badge';
import { TransactionCard } from '@frontend/entities/operations/transaction-card/transaction-card';
import { cn } from '@frontend/shared/utils/cn.util';
import { IncomeExpenseCard } from '@frontend/entities/operations/income-expense-card/income-expense-card';

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

      <div className="flex flex-col gap-3 md:hidden">
        {entries.map((entry) => (
          <TransactionCard
            key={entry.id}
            id={entry.id}
            title={entry.title}
            description={frequencyLabel ?? null}
            sum={entry.sum as number}
            type={entry.type as TypeEntry.Income | TypeEntry.Expense}
            {...(entry.category ? { category: entry.category } : {})}
            selectable={selectable}
            {...(entry.selected !== undefined ? { isSelected: entry.selected } : {})}
            {...(selectable ? { onToggleSelect: () => onToggleSelect?.(entry.id) } : {})}
            {...(onDelete ? { handleDelete: onDelete } : {})}
            showDeleteButton={!!onDelete}
            showActions={false}
          />
        ))}
      </div>

      <div className={cn('hidden md:grid md:grid-cols-3 gap-3', gridClassName)}>
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="relative"
          >
            <IncomeExpenseCard
              id={entry.id}
              title={entry.title}
              description={frequencyLabel ?? null}
              sum={entry.sum as number}
              type={entry.type as TypeEntry.Income | TypeEntry.Expense}
              {...(entry.category ? { category: entry.category } : {})}
              {...(onDelete ? { handleDelete: onDelete } : {})}
              showDeleteButton={!!onDelete}
              selectable={selectable}
              {...(entry.selected !== undefined ? { isSelected: entry.selected } : {})}
              {...(selectable ? { onToggleSelect: () => onToggleSelect?.(entry.id) } : {})}
              showMenu={false}
            />

            {showSelectedBadge && entry.selected && (
              <span className="absolute bottom-4 left-4 inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                До оптимізації
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
