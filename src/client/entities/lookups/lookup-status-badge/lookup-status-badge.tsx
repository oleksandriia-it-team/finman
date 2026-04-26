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
        isDeleted ? 'text-red-500' : 'text-gray-800',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px]',
          isDeleted ? 'bg-red-500' : 'bg-green-500',
        )}
      >
        {isDeleted ? '✕' : '✓'}
      </span>
      {isDeleted ? 'Deleted' : 'Active'}
    </span>
  );
}
