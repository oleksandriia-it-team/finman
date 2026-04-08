import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { CardContent, CardFooter, CardHeader, CardTitle, UiCard } from '@frontend/ui/ui-card/ui-card';
import { cn } from '@frontend/shared/utils/cn.util';
import { TransactionCardProps } from '@frontend/entities/budget-plan/transaction-card/props/transaction-card-props';
import { UiSeparator } from '@frontend/ui/ui-separator/ui-separator';
import dayjs from 'dayjs';

export function IncomeExpenseCard({ type, title, subtitle, amount, date, className }: TransactionCardProps) {
  return (
    <UiCard
      className={cn(
        'border-t-4 shadow-lg relative flex flex-col w-full gap-4 rounded-4xl group',
        type === 'income' ? 'border-success' : 'border-destructive-foreground',
        className,
      )}
    >
      <div className="top-0 right-0 p-2 absolute hidden group-hover:flex ">
        <UiIconButton
          size="default"
          icon="three-dots-vertical"
          variant="muted"
        />
      </div>

      <CardHeader>
        <div className="flex flex-col items-start gap-3">
          <div
            className={cn(
              'p-2 rounded-3xl',
              type === 'income' ? 'bg-success-muted text-success' : 'bg-destructive text-destructive-foreground',
            )}
          >
            <UiSvgIcon
              name={type === 'income' ? 'arrow-down-left' : 'arrow-up-right'}
              size="3xl"
            />
          </div>
          <CardTitle className="text-2xl line-clamp-1">{title}</CardTitle>
        </div>
        {subtitle ? (
          <p className="text-base text-muted-foreground line-clamp-2">{subtitle}</p>
        ) : (
          <p className="text-sm italic text-muted-foreground/50">Немає опису</p>
        )}
      </CardHeader>

      <UiSeparator className="mx-6 !w-auto" />

      <CardContent>
        <div className="flex flex-col items-start">
          <span className="text-base text-muted-foreground font-semibold">Сума:</span>
          <span
            className={cn(
              'pt-1 text-3xl font-bold',
              type === 'income' ? 'text-success' : 'text-destructive-foreground',
            )}
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
        {date ? dayjs(date).format('DD.MM.YYYY') : ''}
      </CardFooter>
    </UiCard>
  );
}
