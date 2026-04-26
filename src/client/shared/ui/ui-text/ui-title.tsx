import { cn } from '@frontend/shared/utils/cn.util';
import type { TextProps } from '@frontend/ui/ui-text/props/text.props';

export function UiTitle({ className, size = 'xl', ...props }: TextProps) {
  return (
    <span
      data-size={size}
      className={cn('text font-bold text-foreground', className)}
      {...props}
    />
  );
}
