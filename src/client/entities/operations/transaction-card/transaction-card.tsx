'use client';

import { type TransactionCardProps } from './props/transaction-card-props';
import { type TypeEntry } from '@common/enums/entry.enum';
import { UiInfoBlock } from '@frontend/ui/ui-info-block/ui-info-block';
import { cn } from '@frontend/shared/utils/cn.util';
import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import { UiResponsiveMenu } from '@frontend/ui/ui-responsive-menu/ui-responsive-menu';
import { CategoriesMapping } from '@frontend/shared/styles/card-styles-mappings';
import { ExpenseCategories } from '@common/enums/categories.enum';
import { UiResponsiveMenuTrigger } from '@frontend/ui/ui-responsive-menu/ui-responsive-menu-trigger';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { TransactionActions } from '@frontend/entities/operations/card-actions/fin-card-actions';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

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
  showMenu = true,
  showDeleteButton = false,
  selectable = false,
  isSelected = false,
  onToggleSelect,
}: TransactionCardProps) {
  const categoryStyles = CategoriesMapping[category] || CategoriesMapping[ExpenseCategories.Misc];

  // Підтримка обох пропсів для сумісності
  const displayMenu = showMenu && showActions;

  return (
    <div
      className={cn(
        'w-full flex items-center justify-between md:p-3 p-2 rounded-4xl shadow-lg transition-all duration-200',
        bgNone ? 'bg-transparent' : 'bg-card',
        selectable && 'cursor-pointer',
        selectable && isSelected && 'ring-2 ring-primary bg-primary/5',
        className,
      )}
      onClick={selectable ? onToggleSelect : undefined}
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

      <div className="flex shrink-0 items-center gap-2 pl-2">
        {sum !== undefined && (
          <FinTransformCurrency
            value={sum}
            className={cn('font-bold', type && amountColorVariants[type])}
          />
        )}

        {/* Взаємовиключний блок дій (ідентичний до IncomeExpenseCard) */}
        {selectable ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onToggleSelect?.();
            }}
            className={cn(
              'flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors cursor-pointer',
              isSelected
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background text-transparent',
            )}
          >
            <UiSvgIcon
              name="check"
              size="sm"
            />
          </div>
        ) : showDeleteButton ? (
          <UiIconButton
            size="lg"
            icon="trash"
            variant="muted"
            className="!border-none text-muted-foreground hover:text-destructive transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete?.(id!);
            }}
          />
        ) : displayMenu ? (
          <div onClick={(e) => e.stopPropagation()}>
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
                editPath={`profile/tracking-operations/edit/${id}`}
                handleDelete={handleDelete}
              />
            </UiResponsiveMenu>
          </div>
        ) : null}

        {check && <span className={cn('font-bold', type && amountColorVariants[type])}>{check}</span>}
      </div>
    </div>
  );
}
