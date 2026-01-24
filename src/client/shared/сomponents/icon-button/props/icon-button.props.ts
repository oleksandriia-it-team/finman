import { IconSize } from '../../svg-icon/props/svg-icon.props';
import { ButtonVariant } from '../../button/models/button.model';

export interface IconButtonProps {
  className?: string;
  size: IconSize;
  variant: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';

  onClick?: () => void;
  icon: string;
  isOutlined?: boolean;
}
