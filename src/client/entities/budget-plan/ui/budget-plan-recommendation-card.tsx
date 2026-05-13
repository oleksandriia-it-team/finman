'use client';

import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { CategoriesMapping } from '@frontend/shared/styles/card-styles-mappings';
import { UiIconBadge } from '@frontend/ui/ui-icon-badge/ui-icon-badge';
import { cn } from '@frontend/shared/utils/cn.util';
import type { BudgetPlanRecommendationCardProps } from '@frontend/entities/budget-plan/ui/props/budget-plan-recommendation-card.props';

function getPriorityBadge(priority: number) {
  if (priority >= 7) {
    return {
      className: 'bg-destructive/10 text-destructive',
      label: 'Високий',
    };
  }

  if (priority >= 4) {
    return {
      className: 'bg-amber-500/10 text-amber-600',
      label: 'Середній',
    };
  }

  return {
    className: 'bg-success/10 text-success',
    label: 'Низький',
  };
}

export function BudgetPlanRecommendationCard({
  entry,
  fallbackId,
  onToggle,
}: Readonly<BudgetPlanRecommendationCardProps>) {
  const categoryStyles = CategoriesMapping[entry.category ?? 'expense-misc'];
  const isSelected = entry.selected;
  const priorityBadge = getPriorityBadge(entry.priority);
  const entryId = entry.id ?? fallbackId;

  return (
    <button
      type="button"
      className={cn(
        'w-full bg-card rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-all text-left',
        isSelected && 'ring-2 ring-primary',
      )}
      onClick={() => onToggle(entryId)}
    >
      <div
        className={cn(
          'w-6 h-6 rounded border-2 border-border flex items-center justify-center flex-shrink-0',
          isSelected && 'bg-primary border-primary',
        )}
      >
        {isSelected && (
          <UiSvgIcon
            name="check"
            size="sm"
            className="text-white"
          />
        )}
      </div>

      <div className="flex items-center gap-3 flex-1 min-w-0">
        <UiIconBadge
          variant={categoryStyles.variant}
          name={categoryStyles.icon}
          size="lg"
        />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm">{entry.title}</p>
          <p className="text-xs text-muted-foreground">
            {categoryStyles.label} • Важливість: {entry.priority}
          </p>
        </div>
      </div>

      <div className="font-bold text-sm text-destructive whitespace-nowrap ml-auto">
        - <FinTransformCurrency value={entry.sum ?? 0} />
      </div>

      <div className={cn('px-2 py-1 rounded-full text-xs font-semibold', priorityBadge.className)}>
        {priorityBadge.label}
      </div>
    </button>
  );
}
