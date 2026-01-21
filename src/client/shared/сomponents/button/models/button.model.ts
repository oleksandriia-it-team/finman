import { ChildrenComponentProps } from '../../../models/component-with-chilren.model';

export type ButtonVariant = 'warning' | 'danger' | 'info' | 'success';

export interface ButtonModel extends ChildrenComponentProps {
  className?: string | undefined;
  variant: ButtonVariant;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void | undefined;
  isOutlined?: boolean | undefined;
  isRoundedFull?: boolean | undefined;
}
