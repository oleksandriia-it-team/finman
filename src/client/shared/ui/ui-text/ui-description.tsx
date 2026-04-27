import type { TextProps } from '@frontend/ui/ui-text/props/text.props';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiDescription({ className, size = 'default', ...props }: TextProps) {
  return (
    <span
      data-size={size}
      className={cn('text text-muted-foreground', className)}
      {...props}
    />
  );
}
