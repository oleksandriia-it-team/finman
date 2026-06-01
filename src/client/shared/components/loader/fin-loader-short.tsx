import { UiBouncingDots } from '@frontend/ui/ui-bouncing-dots/ui-bouncing-dots';
import type { ComponentProps } from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

export function FinLoaderShort({
  className,
  withoutDefaultWidth,
  ...props
}: Omit<ComponentProps<'div'>, 'children'> & { withoutDefaultWidth?: boolean }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        !withoutDefaultWidth && 'size-full min-h-[6rem] min-w-[6rem]',
        className,
      )}
      {...props}
    >
      <UiBouncingDots dotClassName="size-2" />
    </div>
  );
}
