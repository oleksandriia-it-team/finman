import { UiBouncingDots } from '@frontend/ui/ui-bouncing-dots/ui-bouncing-dots';
import type { ComponentProps } from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

export function FinLoaderShort({ className, ...props }: Omit<ComponentProps<'div'>, 'children'>) {
  return (
    <div
      className={cn('size-full min-h-[6rem] min-w-[6rem] flex flex-col items-center justify-center', className)}
      {...props}
    >
      <UiBouncingDots dotClassName="size-2" />
    </div>
  );
}
