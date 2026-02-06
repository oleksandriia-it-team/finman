'use client';

import { useState } from 'react';
import Stepper from '../client/shared/сomponents/stepper/stepper';
import StepperItem from '../client/shared/сomponents/stepper/stepper-item';

export default function MainPage() {
  const [step, setStep] = useState<number>(0);

  return (
    <Stepper
      setStep={setStep}
      currentStep={step}
    >
      <StepperItem
        className="size-full"
        currentStep={step}
        step={0}
      >
        <div className="bg-red-100 size-full">1</div>
      </StepperItem>
      <StepperItem
        className="size-full"
        currentStep={step}
        step={1}
      >
        <div className="bg-blue-100 size-full">2</div>
      </StepperItem>
      <StepperItem
        className="size-full"
        currentStep={step}
        step={2}
      >
        <div className="bg-green-100 size-full">3</div>
      </StepperItem>
      <StepperItem
        className="size-full"
        currentStep={step}
        step={3}
      >
        <div className="bg-purple-100 size-full">4</div>
      </StepperItem>
    </Stepper>
  );
}
