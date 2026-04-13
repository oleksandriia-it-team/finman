import { cn } from '@frontend/shared/utils/cn.util';

function UiSkeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('animate-pulse rounded-md bg-accent', className)}
      {...props}
    />
  );
}

export { UiSkeleton };
