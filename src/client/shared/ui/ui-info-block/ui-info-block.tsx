import { UiSvgIconContainer, type UiSvgIconContainerProps } from '@frontend/ui/ui-svg-icon/ui-svg-icon-container';
import { cn } from '@frontend/shared/utils/cn.util';

interface UiInfoBlockProps extends UiSvgIconContainerProps {
  title: string;
  description?: string | null;
  className?: string;
  iconClassName?: string;
}

export function UiInfoBlock({ title, description, className, iconClassName, ...props }: UiInfoBlockProps) {
  return (
    <div className={cn('flex flex-row items-center gap-3', className)}>
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
