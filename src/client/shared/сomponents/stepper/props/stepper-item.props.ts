import { ComponentDefaultProps } from '../../../props/component.props';

export interface StepperItemProps extends ComponentDefaultProps {
  step: number;
  currentStep: number;
}
