import { IconSize } from '../../svg-icon/models/svg-icon.model';
import { ButtonVariant } from '../../button/models/button.model';

export interface IconButtonModel {
  className?: string;
  size: IconSize;
  variant: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';

  onClick?: () => void;
  icon: string;
  isOutlined?: boolean;
}
