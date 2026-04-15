import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { CardContent, CardFooter, CardHeader, CardTitle, UiCard } from '@frontend/ui/ui-card/ui-card';
import { cn } from '@frontend/shared/utils/cn.util';
import { type TransactionCardRegularProps } from '@frontend/entities/budget-plan/transaction-card/props/transaction-card-props';
import { UiSeparator } from '@frontend/ui/ui-separator/ui-separator';
import { CategoriesMapping } from '@frontend/entities/budget-plan/income-expense-card/card-styles-mappings';
import { UiTransformDate } from '@frontend/ui/ui-transform-date/ui-transform-date';
import { DateFormatType } from '@frontend/shared/enums/date-type.enum';

export function IncomeExpenseCard({
  type,
  subtitle,
  amount,
  date,
  className,
  category = 'misc',
}: TransactionCardRegularProps) {
  const categoryStyles = CategoriesMapping[category] || CategoriesMapping.misc;

  return (
    <UiCard
      className={cn(
        'border-t-4 shadow-lg relative flex flex-col w-full gap-4 rounded-4xl',
        categoryStyles.borderColor,
        className,
      )}
    >
      <CardHeader>
        <div className="flex flex-col items-start gap-3">
          <div className="flex between w-full justify-between">
            <div
              className={cn('p-4 rounded-3xl flex justify-between', categoryStyles.bgColor, categoryStyles.textColor)}
            >
              <UiSvgIcon
                name={categoryStyles.icon}
                size="lg"
              />
            </div>
            <UiIconButton
              size="default"
              icon="three-dots-vertical"
              variant="muted"
              className="!border-none"
            />
          </div>
          <CardTitle className="text-lg line-clamp-1"> {categoryStyles.label} </CardTitle>
        </div>
        {subtitle ? (
          <p className="text-sm text-muted-foreground line-clamp-2">{subtitle}</p>
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
            {type === 'expense' && '-'}{' '}
            {Number(amount).toLocaleString('uk-UA', {
              style: 'currency',
              currency: 'UAH',
              currencyDisplay: 'narrowSymbol',
            })}
          </span>
        </div>
      </CardContent>

      <UiSeparator className="mx-6 !w-auto" />

      <CardFooter className=" flex justify-between items-center">
        {date && (
          <UiTransformDate
            className="text-sm"
            date={date}
            type={DateFormatType.ShortWithYear}
          />
        )}
      </CardFooter>
    </UiCard>
  );
}
