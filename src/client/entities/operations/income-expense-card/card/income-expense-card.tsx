import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { CardContent, CardFooter, CardHeader, CardTitle, UiCard } from '@frontend/ui/ui-card/ui-card';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiSeparator } from '@frontend/ui/ui-separator/ui-separator';
import { CategoriesMapping } from '@frontend/shared/styles/card-styles-mappings';
import { FinTransformDate } from '@frontend/components/transform-date/fin-transform-date';
import { DateFormatType } from '@frontend/shared/enums/date-type.enum';
import { UiResponsiveMenu } from '@frontend/ui/ui-responsive-menu/ui-responsive-menu';
import { UiResponsiveMenuTrigger } from '@frontend/ui/ui-responsive-menu/ui-responsive-menu-trigger';
import { UiConfirmModal } from '@frontend/components/confirm-modal/fin-confirm-modal';
import { ExpenseCategories } from '@common/enums/categories.enum';
import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import type { TransactionCardProps } from '@frontend/entities/operations/transaction-card/props/transaction-card-props';
import { TransactionActions } from '@frontend/entities/operations/card-actions/fin-card-actions';
import { UiIconBadge } from '@frontend/ui/ui-icon-badge/ui-icon-badge';

import './styles/income-expense-card-styles.scss';

export function IncomeExpenseCard({
  id,
  type,
  description,
  sum,
  createdAt,
  className,
  category = ExpenseCategories.Misc,
  title = '',
  handleDelete,
  showActions = true,
  deletable,
  editPath,
  badge,
}: TransactionCardProps) {
  const categoryStyles = CategoriesMapping[category];

  return (
    <UiCard
      className={cn(
        'income-expense-card border-t-4 shadow-lg relative flex flex-col w-full gap-4 rounded-4xl',
        className,
      )}
      data-variant={categoryStyles.variant}
    >
      <CardHeader className="min-w-0 w-full overflow-hidden">
        <div className="flex flex-col items-start gap-3">
          <div className="flex between w-full justify-between">
            <UiIconBadge
              variant={categoryStyles.variant}
              isReversed
              size="lg"
              name={categoryStyles.icon}
            />
            {deletable ? (
              <UiConfirmModal
                trigger={
                  <UiIconButton
                    size="lg"
                    icon="trash3"
                    variant="destructive"
                    className="!border-none"
                  />
                }
                onConfirm={() => id != null && handleDelete?.(id)}
              />
            ) : (
              showActions && (
                <UiResponsiveMenu>
                  <UiResponsiveMenuTrigger asChild>
                    <UiIconButton
                      size="lg"
                      icon="three-dots-vertical"
                      variant="muted-foreground"
                      className="!border-none"
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
          </div>
          <CardTitle className="text-lg line-clamp-1">{title || categoryStyles.label}</CardTitle>
        </div>
        {description ? (
          <p className="text-sm text-muted-foreground break-words w-full">{description}</p>
        ) : (
          <p className="text-xs italic text-muted-foreground/50">Немає опису</p>
        )}
      </CardHeader>

      <UiSeparator className="mx-6 !w-auto" />

      <CardContent>
        <div className="flex flex-col items-start">
          <span className="text-sm text-muted-foreground font-semibold">Сума:</span>
          <span
            className={cn('pt-1 text-lg font-bold', type === 'income' ? 'text-success' : 'text-destructive-foreground')}
          >
            <FinTransformCurrency value={sum ?? 0} />
          </span>
        </div>
      </CardContent>

      <UiSeparator className="mx-6 !w-auto" />

      <CardFooter className="flex justify-between items-center">
        {badge ??
          (createdAt && (
            <FinTransformDate
              className="text-sm"
              date={createdAt}
              type={DateFormatType.ShortWithYear}
            />
          ))}
      </CardFooter>
    </UiCard>
  );
}
