'use client';

import { type TransactionCardProps } from './props/transaction-card-props';
import { type TypeEntry } from '@common/enums/entry.enum';
import { UiInfoBlock } from '@frontend/ui/ui-info-block/ui-info-block';
import { cn } from '@frontend/shared/utils/cn.util';
import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import { UiResponsiveMenu } from '@frontend/ui/ui-responsive-menu/ui-responsive-menu';
import { CategoriesMapping } from '@frontend/shared/styles/card-styles-mappings';
import { ExpenseCategories } from '@common/enums/categories.enum';
import { useRouter } from 'next/navigation';
import { UiResponsiveMenuTrigger } from '@frontend/ui/ui-responsive-menu/ui-responsive-menu-trigger';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { TransactionActions } from '@frontend/entities/card-actions/fin-card-actions';

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
}: TransactionCardProps) {
  const categoryStyles = CategoriesMapping[category] || CategoriesMapping[ExpenseCategories.Misc];
  const router = useRouter();

  return (
    <div
      className={cn(
        'w-full flex items-center justify-between md:p-3 p-2 rounded-4xl shadow-lg mb-2',
        bgNone ? 'bg-transparent' : 'bg-card',
        className,
      )}
    >
      <UiInfoBlock
        icon={icon ?? ''}
        title={title ?? ''}
        category={category}
        description={description ?? ''}
        iconClassName={type ? iconBgVariants[type] : ''}
        isIconRoundedFull={true}
        size="lg"
      />

      <div className="flex items-center gap-2">
        {sum && (
          <FinTransformCurrency
            value={sum}
            className={cn('font-bold', type && amountColorVariants[type])}
          />
        )}
        {check && <span className={cn('font-bold', type && amountColorVariants[type])}>{check}</span>}
      </div>
      <UiResponsiveMenu>
        <UiResponsiveMenu>
          <UiResponsiveMenuTrigger asChild>
            <UiIconButton
              size="lg"
              icon="three-dots-vertical"
              variant="muted"
              className="!border-none"
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
      </UiResponsiveMenu>
    </div>
  );
}
