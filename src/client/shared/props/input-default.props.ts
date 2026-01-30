import { ComponentDefaultProps } from './component.props';

export interface InputDefaultProps extends ComponentDefaultProps {
  value?: string | undefined;
  placeholder?: string | undefined;
}
