import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { cn } from '@frontend/shared/utils/cn.util';
import type { SvgIconProps } from '@frontend/ui/ui-svg-icon/props/svg-icon.props';

export interface UiSvgIconContainerProps extends SvgIconProps {
  className?: string;
}

export function UiSvgIconContainer({ className, ...props }: UiSvgIconContainerProps) {
  const classes = cn('flex items-center justify-center rounded-2xl bg-secondary p-2 text-primary', className);

  return (
    <div className={classes}>
      <UiSvgIcon
        size={props.size || 'default'}
        name={props.name}
      />
    </div>
  );
}
