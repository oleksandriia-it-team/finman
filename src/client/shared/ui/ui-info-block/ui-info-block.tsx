import { cn } from '@frontend/shared/utils/cn.util';
import { UiIconBadge } from '@frontend/ui/ui-icon-badge/ui-icon-badge';
import { UiTitle } from '../ui-text/ui-title';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';

interface UiInfoBlockProps {
  name: string;
  title: string;
  description?: string | null;
  className?: string;
  iconClassName?: string;
  bgClassName?: string;
  onClick?: () => void;
}

export function UiInfoBlock({
  title,
  description,
  className,
  iconClassName,
  bgClassName,
  onClick,
  ...props
}: UiInfoBlockProps) {
  const isClickable = !!onClick;

  return (
    <div
      className={cn(
        'flex flex-row items-center gap-3 p-3 rounded-xl transition-all duration-200',
        bgClassName,
        isClickable && 'cursor-pointer hover:opacity-80 active:scale-[0.98]',
        className,
      )}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <UiIconBadge
        isReversed
        variant="primary"
        size="sm"
        className={cn('shrink-0 !bg-muted/20', iconClassName)}
        {...props}
      />
      <div className="flex flex-col">
        <UiTitle size="lg">{title}</UiTitle>
        <UiDescription size="default">{description}</UiDescription>
      </div>
    </div>
  );
}
