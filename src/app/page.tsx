'use client';

import { UiStepper } from '@frontend/ui/ui-stepper/ui-stepper';
import { UiStepperItem } from '@frontend/ui/ui-stepper/ui-stepper-item';
import { useState } from 'react';

export default function MainPage() {
  const [step, setStep] = useState<number>(0);

  return (
    <UiStepper
      setStep={setStep}
      currentStep={step}
    >
      <UiStepperItem
        className="size-full"
        currentStep={step}
        step={0}
      >
        <div className="bg-red-100 size-full">1</div>
      </UiStepperItem>
      <UiStepperItem
        className="size-full"
        currentStep={step}
        step={1}
      >
        <div className="bg-blue-100 size-full">2</div>
      </UiStepperItem>
      <UiStepperItem
        className="size-full"
        currentStep={step}
        step={2}
      >
        <div className="bg-green-100 size-full">3</div>
      </UiStepperItem>
      <UiStepperItem
        className="size-full"
        currentStep={step}
        step={3}
      >
        <div className="bg-purple-100 size-full">4</div>
      </UiStepperItem>
    </UiStepper>
  );
}
