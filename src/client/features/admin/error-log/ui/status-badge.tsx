import { ErrorLogStatus } from '@common/constants/error-log-status.constant';
import { cn } from '@frontend/shared/utils/cn.util';

export function StatusBadge({ status }: { status: ErrorLogStatus }) {
  let dotColor = 'bg-muted-foreground';
  let label: string = status;

  switch (status) {
    case ErrorLogStatus.Active:
      dotColor = 'bg-destructive-foreground';
      label = 'Активна';
      break;
    case ErrorLogStatus.IsResolving:
      dotColor = 'bg-warning';
      label = 'В обробці';
      break;
    case ErrorLogStatus.Resolved:
      dotColor = 'bg-success';
      label = 'Вирішена';
      break;
    case ErrorLogStatus.Ignored:
      dotColor = 'bg-muted-foreground';
      label = 'Ігнорована';
      break;
  }

  return (
    <div className="flex items-center gap-2 text-sm text-foreground font-medium">
      <span className={cn('s-1.5 rounded-full flex-shrink-0', dotColor)} />
      {label}
    </div>
  );
}
