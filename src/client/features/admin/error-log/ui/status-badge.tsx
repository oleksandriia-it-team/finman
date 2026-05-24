import { ErrorLogStatus } from '@common/constants/error-log-status.constant';
import { cn } from '@frontend/shared/utils/cn.util';

const StatusBadgeColorVariants: Record<ErrorLogStatus, string> = {
  [ErrorLogStatus.Active]: 'bg-destructive-foreground',
  [ErrorLogStatus.IsResolving]: 'bg-warning',
  [ErrorLogStatus.Resolved]: 'bg-success',
  [ErrorLogStatus.Ignored]: 'bg-muted-foreground',
};

const StatusBadgeLabelVariants: Record<ErrorLogStatus, string> = {
  [ErrorLogStatus.Active]: 'Активна',
  [ErrorLogStatus.IsResolving]: 'В обробці',
  [ErrorLogStatus.Resolved]: 'Вирішена',
  [ErrorLogStatus.Ignored]: 'Ігнорована',
};

export function StatusBadge({ status }: { status: ErrorLogStatus }) {
  return (
    <div className="flex items-center gap-2 text-sm text-foreground font-medium">
      <span className={cn('s-1.5 rounded-full flex-shrink-0', StatusBadgeColorVariants[status])} />
      {StatusBadgeLabelVariants[status]}
    </div>
  );
}
