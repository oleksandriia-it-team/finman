import { UiSvgIconContainer, type UiSvgIconContainerProps } from '@frontend/ui/ui-svg-icon/ui-svg-icon-container';
import { cn } from '@frontend/shared/utils/cn.util';

interface UiInfoBlockProps extends UiSvgIconContainerProps {
  title: string;
  description?: string | null;
  className?: string;
}

export function UiInfoBlock({ title, description, className, ...props }: UiInfoBlockProps) {
  const classes = cn('flex flex-row', className);

  return (
    <div className={classes}>
      <UiSvgIconContainer
        className="self-center"
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
