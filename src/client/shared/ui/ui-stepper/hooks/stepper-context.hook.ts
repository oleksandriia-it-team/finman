import { type StepperContextProps } from '@frontend/ui/ui-stepper/props/stepper-context.props';
import { createContext, useContext } from 'react';
import { ErrorTexts } from '@common/constants/error-texts.constant';

export const StepperContext = createContext<StepperContextProps | null>(null);

export function useStepper() {
  const context = useContext(StepperContext);

  if (!context) {
    throw new Error(ErrorTexts.StepperContextMissing);
  }

  return context;
}
