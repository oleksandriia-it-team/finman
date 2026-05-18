import type { ComponentProps } from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiLayoutContent({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex-1 min-h-0', className)}
      {...props}
    >
      {children};{children}
    </div>
  );
}
