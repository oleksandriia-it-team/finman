import { cn } from '@frontend/shared/utils/cn.util';

interface LookupStatusBadgeProps {
  softDeleted: 0 | 1 | undefined;
}

export function LookupStatusBadge({ softDeleted }: LookupStatusBadgeProps) {
  const isDeleted = softDeleted === 1;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-sm font-medium',
        isDeleted ? 'text-destructive' : 'text-foreground',
      )}
    >
      <span
        aria-hidden="true"
        className={cn('inline-flex h-2.5 w-2.5 rounded-full', isDeleted ? 'bg-destructive' : 'bg-success')}
      />
      {isDeleted ? 'Deleted' : 'Active'}
    </span>
  );
}
