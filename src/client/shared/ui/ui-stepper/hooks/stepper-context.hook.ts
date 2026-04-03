import { StepperContextProps } from '@frontend/ui/ui-stepper/props/stepper-context.props';
import { createContext, useContext } from 'react';

export const StepperContext = createContext<StepperContextProps | null>(null);

export function useStepper() {
  const context = useContext(StepperContext);

  if (!context) {
    throw new Error('useStepper must be used within a <Stepper />');
  }

  return context;
}
