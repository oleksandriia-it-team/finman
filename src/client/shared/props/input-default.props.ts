import { ComponentDefaultProps } from './component.props';

export interface InputDefaultProps extends Omit<ComponentDefaultProps, 'onChange' | 'onInput'> {
  value?: string | undefined | null;
  placeholder?: string | undefined;
  size?: 'small' | 'medium' | 'large';
}
