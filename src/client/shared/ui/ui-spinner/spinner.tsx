import { LoaderSvg } from '@frontend/shared/svg/loader-svg';
import { type ComponentProps } from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiSpinner({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <LoaderSvg
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}
