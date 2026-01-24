import { ComponentDefaultProps } from '../../../models/component-props.model';
import { ChildrenComponentProps } from '../../../models/component-with-chilren.model';

export type ButtonVariant = 'warning' | 'danger' | 'info' | 'success';

export type ButtonModel = ComponentDefaultProps &
  ChildrenComponentProps & {
    variant: ButtonVariant;
    type?: 'button' | 'submit' | 'reset' | undefined;
    onClick?: () => void | undefined;
    isOutlined?: boolean | undefined;
    isRoundedFull?: boolean | undefined;
  };
