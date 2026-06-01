import { cn } from '@frontend/shared/utils/cn.util';
import type { UiStatusBadgeProps } from '@frontend/ui/ui-status-badge/props/ui-status-badge.props';

const variantClasses: Record<NonNullable<UiStatusBadgeProps['variant']>, string> = {
  success: 'bg-success/15 text-success',
  teal: 'bg-teal/15 text-teal-muted-foreground',
  warning: 'bg-warning/15 text-warning-muted-foreground',
  orange: 'bg-orange/15 text-orange-muted-foreground',
  destructive: 'bg-destructive/15 text-destructive-foreground',
  neutral: 'bg-muted text-muted-foreground',
};

export function UiStatusBadge({ label, variant = 'neutral', className }: UiStatusBadgeProps) {
  return (
    <span
      className={cn(
        'text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap',
        variantClasses[variant],
        className,
      )}
    >
      {label}
    </span>
  );
}
