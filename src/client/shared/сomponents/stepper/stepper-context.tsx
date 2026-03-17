import { createContext, useContext } from 'react';
import { StepperContextInterface } from './props/stepper-context-props';

export const StepperContext = createContext<StepperContextInterface | undefined>(undefined);

export const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('Stepper context must be used within the context');
  }
  return context;
};
