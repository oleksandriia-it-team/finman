import { cn } from '@frontend/shared/utils/cn.util';
import { type ComponentProps } from 'react';

export function UiPagination({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}
