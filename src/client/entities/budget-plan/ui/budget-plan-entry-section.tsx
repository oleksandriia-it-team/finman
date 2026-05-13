'use client';

import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { CategoriesMapping } from '@frontend/shared/styles/card-styles-mappings';
import { UiIconBadge } from '@frontend/ui/ui-icon-badge/ui-icon-badge';
import { cn } from '@frontend/shared/utils/cn.util';
import type { BudgetPlanEntrySectionProps } from '@frontend/entities/budget-plan/ui/props/budget-plan-entry-section.props';

export function BudgetPlanEntrySection({
  entries,
  iconName,
  iconClassName,
  title,
  showSelectedBadge = false,
}: Readonly<BudgetPlanEntrySectionProps>) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <UiSvgIcon
          name={iconName}
          size="sm"
          className={iconClassName}
        />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <div className="space-y-2">
        {entries.map((entry) => {
          const categoryStyles = CategoriesMapping[entry.category ?? 'expense-misc'];
          const isIncome = entry.type === 'income';

          return (
            <div
              key={entry.id}
              className="bg-card rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <UiIconBadge
                  variant={categoryStyles.variant}
                  name={categoryStyles.icon}
                  size="lg"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm">{entry.title}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-xs text-muted-foreground">{categoryStyles.label}</p>
                    {showSelectedBadge && entry.selected && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        До оптимізації
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className={cn('font-bold text-sm whitespace-nowrap', isIncome ? 'text-success' : 'text-destructive')}>
                {isIncome ? '+' : '-'} <FinTransformCurrency value={entry.sum ?? 0} />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
