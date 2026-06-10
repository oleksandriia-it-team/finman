import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import type { ChartFiltersButtonProps } from '@frontend/components/chart-filters-button/chart-filters-button-props';
import { cn } from '@frontend/shared/utils/cn.util';

export function ChartFiltersButton({ icon, counter, title, className, ...props }: ChartFiltersButtonProps) {
  const classes = cn('flex gap-2 border border-muted-foreground', className);
  return (
    <UiButton
      {...props}
      className={classes}
    >
      <UiSvgIcon name={icon} />
      <p className="truncate">{title}</p>
      {counter != null && counter > 0 && (
        <div className="size-5 bg-primary rounded-full">
          <p className="text-sm text-primary-foreground">{counter}</p>
        </div>
      )}
    </UiButton>
  );
}
