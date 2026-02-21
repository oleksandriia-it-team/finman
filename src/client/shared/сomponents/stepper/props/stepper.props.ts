import { ComponentDefaultProps } from '../../../props/component.props';

export interface StepperProps extends ComponentDefaultProps {
  setStep: (newStep: number) => void;
  currentStep: number;
  fullSize?: boolean;
  nextStepOnlyOnButtonClick?: boolean;
}
