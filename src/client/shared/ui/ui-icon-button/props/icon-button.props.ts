import { ButtonProps } from '@frontend/ui/ui-button/props/button.props';
import { IconSize } from '@frontend/ui/ui-svg-icon/props/svg-icon.props';

export interface IconButtonProps extends ButtonProps {
  className?: string;
  size: IconSize;
  icon: string;
  isOutlined?: boolean;
}
