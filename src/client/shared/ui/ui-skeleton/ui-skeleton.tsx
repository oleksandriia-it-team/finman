import { cn } from '@frontend/shared/utils/cn.util';

function UiSkeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('animate-pulse rounded-4xl bg-secondary w-full h-10', className)}
      {...props}
    />
  );
}

export { UiSkeleton };
