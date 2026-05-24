'use client';

import type { FieldsWithDividerProps } from '@frontend/ui/ui-fields-with-divider/props/fields-with-divider.props';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiFieldsWithDivider({ className, firstField, secondField, ...props }: FieldsWithDividerProps) {
  return (
    <div
      className={cn('relative flex flex-row items-center justify-center gap-10 text-muted-foreground', className)}
      {...props}
    >
      {firstField}
      <span
        className="pt-4 absolute text-foreground"
        aria-hidden="true"
      >
        —
      </span>
      {secondField}
    </div>
  );
}
