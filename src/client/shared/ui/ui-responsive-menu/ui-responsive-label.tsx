import { cn } from '@frontend/shared/utils/cn.util';
import { ComponentProps } from 'react';

export function UiResponsiveLabel({ className, children, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cn('md:text-base text-lg md:h-7 h-8 block font-semibold text-muted-foreground', className)}
      {...props}
    >
      {children}
    </span>
  );
}
