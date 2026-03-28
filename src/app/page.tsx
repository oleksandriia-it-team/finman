'use client';

import { UiStepper } from '@frontend/ui/ui-stepper/ui-stepper';
import { UiStepperItem } from '@frontend/ui/ui-stepper/ui-stepper-item';
import { StepperApi } from '@frontend/ui/ui-stepper/props/stepper.props';
import { useState } from 'react';
import { UiStepperContent } from '@frontend/ui/ui-stepper/ui-stepper-content';

export default function MainPage() {
  const [api, setApi] = useState<StepperApi>();

  return (
    <UiStepper setApi={setApi}>
      <UiStepperContent>
        <UiStepperItem key={1}>
          <div className="bg-red-100 size-full">1</div>
        </UiStepperItem>
        <UiStepperItem key={2}>
          <div className="bg-blue-100 size-full">2</div>
        </UiStepperItem>
        <UiStepperItem key={3}>
          <div className="bg-green-100 size-full">3</div>
        </UiStepperItem>
        <UiStepperItem key={4}>
          <div className="bg-purple-100 size-full">4</div>
        </UiStepperItem>
      </UiStepperContent>
    </UiStepper>
  );
}
