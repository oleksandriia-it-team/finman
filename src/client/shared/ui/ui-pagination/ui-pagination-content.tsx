import { ComponentProps } from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiPaginationContent({ className, ...props }: ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  );
}
