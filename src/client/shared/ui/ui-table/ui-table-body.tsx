import { type ComponentProps } from 'react';

import { cn } from '@frontend/shared/utils/cn.util';

export function UiTableBody({ className, ...props }: ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  );
}

