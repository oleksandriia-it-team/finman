'use client';

import { type TransactionCardProps } from './props/transaction-card-props';
import { type TypeEntry } from '@common/enums/entry.enum';
import { UiInfoBlock } from '@frontend/ui/ui-info-block/ui-info-block';
import { cn } from '@frontend/shared/utils/cn.util';
import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import { UiResponsiveMenu } from '@frontend/ui/ui-responsive-menu/ui-responsive-menu';
import { useCategoriesMapping } from '@frontend/shared/styles/card-styles-mappings';
import { ExpenseCategories } from '@common/enums/categories.enum';
import { UiResponsiveMenuTrigger } from '@frontend/ui/ui-responsive-menu/ui-responsive-menu-trigger';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { UiConfirmModal } from '@frontend/components/confirm-modal/fin-confirm-modal';
import { TransactionActions } from '@frontend/entities/operations/card-actions/fin-card-actions';

const iconBgVariants: Record<TypeEntry.Income | TypeEntry.Expense, string> = {
  income: 'bg-success/10 text-success',
  expense: 'bg-destructive-foreground/10 text-destructive-foreground',
};

const amountColorVariants: Record<TypeEntry.Income | TypeEntry.Expense, string> = {
  income: 'text-success',
  expense: 'text-destructive-foreground',
};

export function TransactionCard({
  icon,
  title,
  description,
  sum,
  type,
  className,
  bgNone,
  check,
  category = 'expense-misc',
  handleDelete,
  id,
  showActions = true,
  deletable,
  editPath,
  badge,
}: TransactionCardProps) {
  const categoriesMapping = useCategoriesMapping();
  const categoryStyles = categoriesMapping[category] || categoriesMapping[ExpenseCategories.Misc];

  return (
    <div
      className={cn(
        'w-full flex items-center justify-between md:p-3 p-2 rounded-4xl shadow-lg',
        bgNone ? 'bg-transparent' : 'bg-card',
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <UiInfoBlock
          icon={icon ?? ''}
          title={title ?? ''}
          category={category}
          description={description ?? ''}
          iconClassName={type ? iconBgVariants[type] : ''}
          isIconRoundedFull={true}
          size="lg"
        />
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {badge}
        {sum && (
          <FinTransformCurrency
            value={sum}
            className={cn(!showActions && !deletable && 'pr-3', 'font-bold', type && amountColorVariants[type])}
          />
        )}
        {deletable ? (
          <UiConfirmModal
            trigger={
              <UiIconButton
                size="lg"
                icon="trash3"
                variant="destructive"
                borderNone
                className="pr-1"
              />
            }
            onConfirm={() => id != null && handleDelete?.(id)}
          />
        ) : (
          showActions && (
            <UiResponsiveMenu>
              <UiResponsiveMenuTrigger
                asChild
                className="pr-1"
              >
                <UiIconButton
                  size="lg"
                  icon="three-dots-vertical"
                  variant="muted"
                  borderNone
                />
              </UiResponsiveMenuTrigger>

              <TransactionActions
                id={id}
                icon={categoryStyles.icon}
                title={title || categoryStyles.label}
                editPath={editPath || '/profile'}
                handleDelete={handleDelete}
              />
            </UiResponsiveMenu>
          )
        )}
        {check && <span className={cn('font-bold', type && amountColorVariants[type])}>{check}</span>}
      </div>
    </div>
  );
}
