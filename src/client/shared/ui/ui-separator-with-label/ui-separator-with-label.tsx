'use client';

import { cn } from '@frontend/shared/utils/cn.util';
import { UiSeparator } from '@frontend/shared/ui/ui-separator/ui-separator';
import type { SeparatorWithLabelProps } from './props/separator-with-label.props';

export function UiSeparatorWithLabel({ label, className, ...props }: SeparatorWithLabelProps) {
  return (
    <div
      className={cn('relative', className)}
      {...props}
    >
      <div className="absolute inset-0 flex items-center">
        <UiSeparator />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="text-muted-foreground bg-primary-foreground px-2">{label}</span>
      </div>
    </div>
  );
}
