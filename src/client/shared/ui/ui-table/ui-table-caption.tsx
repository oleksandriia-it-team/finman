import { type ComponentProps } from 'react';

import { cn } from '@frontend/shared/utils/cn.util';

export function UiTableCaption({ className, ...props }: ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('mt-4 text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

