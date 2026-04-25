import { UiSvgIconContainer, type UiSvgIconContainerProps } from '@frontend/ui/ui-svg-icon/ui-svg-icon-container';
import { cn } from '@frontend/shared/utils/cn.util';

interface UiInfoBlockProps extends UiSvgIconContainerProps {
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
      <UiSvgIconContainer
        className={cn('shrink-0', iconClassName)}
        {...props}
      />
      <div className="flex flex-col">
        <h3 className="text-lg">
          <b>{title}</b>
        </h3>
        {description && <p className="text-sm text-muted">{description}</p>}
      </div>
    </div>
  );
}
