import { UiBouncingDots } from '@frontend/ui/ui-bouncing-dots/ui-bouncing-dots';
import type { ComponentProps } from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

export function FinLoaderShort({
  className,
  withoutMinWidth,
  ...props
}: Omit<ComponentProps<'div'>, 'children'> & { withoutMinWidth?: boolean }) {
  return (
    <div
      className={cn(
        'size-full flex flex-col items-center justify-center',
        !withoutMinWidth && 'min-h-[6rem] min-w-[6rem]',
        className,
      )}
      {...props}
    >
      <UiBouncingDots dotClassName="size-2" />
    </div>
  );
}
