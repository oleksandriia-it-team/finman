import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { CardAction, CardContent, CardFooter, CardHeader, CardTitle, UiCard } from '@frontend/ui/ui-card/ui-card';
import { cn } from '@frontend/shared/utils/cn.util';
import { TransactionCardProps } from '@frontend/entities/budget-plan/transaction-card/props/transaction-card-props';

export function IncomeExpenseCard({ type, title, subtitle, amount, className }: TransactionCardProps) {
  return (
    <UiCard className={cn('flex flex-col h-full min-h-[10rem]', className)}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'p-2 rounded-full',
              type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600',
            )}
          >
            <UiSvgIcon
              name={type === 'income' ? 'arrow-down-left' : 'arrow-up-right'}
              size="sm"
            />
          </div>
          <CardTitle className="text-base line-clamp-1">{title}</CardTitle>
        </div>

        <CardAction>
          <UiIconButton
            size="default"
            icon="three-dots-vertical"
            variant="muted"
          />
        </CardAction>
      </CardHeader>

      <CardContent className="flex-grow">
        {subtitle ? (
          <p className="text-sm text-muted-foreground line-clamp-2">{subtitle}</p>
        ) : (
          <p className="text-sm italic text-muted-foreground/50">Немає опису</p>
        )}
      </CardContent>

      <CardFooter className="border-t pt-3 flex justify-between items-center bg-muted/5">
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Сума:</span>
        <span className={cn('text-lg font-bold', type === 'income' ? 'text-green-600' : 'text-red-600')}>
          {type === 'expense' && '-'} {amount + '₴'}
        </span>
      </CardFooter>
    </UiCard>
  );
}
