import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { CardContent, CardFooter, CardHeader, CardTitle, UiCard } from '@frontend/ui/ui-card/ui-card';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiSeparator } from '@frontend/ui/ui-separator/ui-separator';
import { CategoriesMapping } from '@frontend/entities/budget-plan/income-expense-card/card-styles-mappings';
import { FinTransformDate } from '@frontend/components/transform-date/fin-transform-date';
import { DateFormatType } from '@frontend/shared/enums/date-type.enum';
import { UiResponsiveMenu } from '@frontend/ui/ui-responsive-menu/ui-responsive-menu';
import { UiResponsiveMenuTrigger } from '@frontend/ui/ui-responsive-menu/ui-responsive-menu-trigger';
import { UiResponsiveMenuContent } from '@frontend/ui/ui-responsive-menu/ui-responsive-menu-content';
import { FinResponsiveMenuItem } from '@frontend/components/responsive-menu-item/fin-responsive-menu-item';
import { UiResponsiveLabel } from '@frontend/ui/ui-responsive-menu/ui-responsive-label';
import { ExpenseCategories } from '@common/enums/categories.enum';
import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import type { TransactionCardProps } from '@frontend/entities/budget-plan/transaction-card/props/transaction-card-props';
import { useRouter } from 'next/navigation';
import { UiConfirmModal } from '@frontend/components/confirm-modal/fin-confirm-modal';

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
}: TransactionCardProps) {
  const categoryStyles = CategoriesMapping[category] || CategoriesMapping[ExpenseCategories.Misc];
  const router = useRouter();
  return (
    <UiCard
      className={cn(
        'border-t-4 shadow-lg relative flex flex-col w-full gap-4 rounded-4xl overflow-hidden',
        categoryStyles.borderColor,
        className,
      )}
    >
      <CardHeader className="min-w-0 w-full overflow-hidden">
        <div className="flex flex-col items-start gap-3">
          <div className="flex between w-full justify-between">
            <div
              className={cn('p-4 rounded-3xl flex justify-between')}
              style={{ backgroundColor: categoryStyles.bgColor, color: categoryStyles.textColor }}
            >
              <UiSvgIcon
                name={categoryStyles.icon}
                size="lg"
              />
            </div>
            <UiResponsiveMenu>
              <UiResponsiveMenuTrigger asChild>
                <UiIconButton
                  size="default"
                  icon="three-dots-vertical"
                  variant="muted"
                  className="!border-none"
                />
              </UiResponsiveMenuTrigger>

              <UiResponsiveMenuContent>
                <UiResponsiveLabel>Оберіть дію</UiResponsiveLabel>
                <FinResponsiveMenuItem
                  name="Редагувати"
                  icon="pencil-fill"
                  onClick={() => router.push(`regular-operations/edit/${id}`)}
                />
                <UiConfirmModal
                  onConfirm={() => {
                    if (handleDelete) {
                      handleDelete(id!);
                    }
                    router.refresh();
                  }}
                  title="Видалити платіж?"
                  description="Після видалення відновити платіж буде неможливо."
                  trigger={
                    <FinResponsiveMenuItem
                      variant="destructive"
                      name="Видалити"
                      icon="trash-fill"
                    />
                  }
                />
              </UiResponsiveMenuContent>
            </UiResponsiveMenu>
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
        {createdAt && (
          <FinTransformDate
            className="text-sm"
            date={createdAt}
            type={DateFormatType.ShortWithYear}
          />
        )}
      </CardFooter>
    </UiCard>
  );
}
