import { ComponentDefaultProps } from './component.props';

export interface InputDefaultProps extends ComponentDefaultProps {
  value?: string | undefined | null;
  placeholder?: string | undefined;
}
