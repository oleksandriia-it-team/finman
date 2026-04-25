import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { cn } from '@frontend/shared/utils/cn.util';
import type { SvgIconProps } from '@frontend/ui/ui-svg-icon/props/svg-icon.props';

export interface UiSvgIconContainerProps extends SvgIconProps {
  className?: string;
  iconBg?: string;
}

export function UiSvgIconContainer({ className, iconBg, ...props }: UiSvgIconContainerProps) {
  const classes = cn(
    'flex items-center justify-center rounded-2xl bg-secondary p-2 text-primary',
    iconBg ? iconBg : 'bg-secondary',
    className,
  );

  return (
    <div
      className={classes}
      style={props.style}
    >
      <UiSvgIcon
        size={props.size || 'default'}
        name={props.name}
      />
    </div>
  );
}
