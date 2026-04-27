import { type ButtonProps } from '@frontend/ui/ui-button/props/button.props';
import { type IconSize } from '@frontend/ui/ui-svg-icon/props/svg-icon.props';

export interface IconButtonProps extends ButtonProps {
  className?: string | undefined;
  size?: IconSize;
  icon: string;
  isOutlined?: boolean;
  borderNone?: boolean;
  widthAuto?: boolean;
}
