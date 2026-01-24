import { ComponentDefaultProps } from './component-props.model';

export interface InputDefaultProps extends ComponentDefaultProps {
  value?: string | undefined;
  placeholder?: string | undefined;
}
