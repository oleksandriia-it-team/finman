import { IconSize } from '@frontend/ui/svg-icon/props/svg-icon.props';
import { ButtonVariant } from '@frontend/ui/button/props/button.props';

export interface IconButtonProps {
  className?: string;
  size: IconSize;
  variant: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
  bgNone?: boolean;
  onClick?: () => void;
  icon: string;
  isOutlined?: boolean;
}
