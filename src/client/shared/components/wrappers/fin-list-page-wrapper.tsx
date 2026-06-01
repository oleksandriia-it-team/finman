import type { ComponentProps } from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

export function FinListPageWrapper({ className, children }: ComponentProps<'div'>) {
  return <div className={cn('size-full overflow-hidden flex flex-col pb-8 relative', className)}>{children}</div>;
}
