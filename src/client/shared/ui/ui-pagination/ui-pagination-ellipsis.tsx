import { cn } from '@frontend/shared/utils/cn.util';
import { ComponentProps } from 'react';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

export function UiPaginationEllipsis({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <UiSvgIcon
        aria-hidden
        name="three-dots"
        size="sm"
      />
    </span>
  );
}
