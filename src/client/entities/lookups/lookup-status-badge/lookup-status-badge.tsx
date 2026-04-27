import { cn } from '@frontend/shared/utils/cn.util';

interface LookupStatusBadgeProps {
  softDeleted: 0 | 1 | undefined;
}

export function LookupStatusBadge({ softDeleted }: LookupStatusBadgeProps) {
  const isDeleted = softDeleted === 1;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-sm font-medium',
        isDeleted ? 'text-destructive' : 'text-foreground',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'flex h-4 w-4 items-center justify-center rounded-full text-[10px]',
          isDeleted ? 'bg-destructive text-primary-foreground' : 'bg-success text-success-foreground',
        )}
      >
        {isDeleted ? '✕' : '✓'}
      </span>
      {isDeleted ? 'Deleted' : 'Active'}
    </span>
  );
}
