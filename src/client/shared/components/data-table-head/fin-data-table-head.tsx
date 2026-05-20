import { UiTableHead } from '@frontend/ui/ui-table/ui-table-head';
import { cn } from '@frontend/shared/utils/cn.util';
import type { ComponentProps } from 'react';

export function FinDataTableHead({ className, children, ...props }: ComponentProps<typeof UiTableHead>) {
  return (
    <UiTableHead
      className={cn('text-xs font-medium text-muted-foreground uppercase tracking-wide h-9', className)}
      {...props}
    >
      {children}
    </UiTableHead>
  );
}
