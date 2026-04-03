'use client';

import MainWelcomeStep from './steps/main-welcome-page/main-welcome-step';
import BenefitsExplanationStep from './steps/benefits-explanation-step/benefits-explanation-step';
import SignUpStep from './steps/sign-up-step/sign-up-step';
import { UiStepper } from '@frontend/ui/ui-stepper/ui-stepper';
import { UiStepperItem } from '@frontend/ui/ui-stepper/ui-stepper-item';
import { UiStepperContent } from '@frontend/ui/ui-stepper/ui-stepper-content';
import { UiStepperNext } from '@frontend/ui/ui-stepper/ui-stepper-next';
import { UiStepperPrev } from '@frontend/ui/ui-stepper/ui-stepper-prev';

//Page-component that meets user when launch app.
// Realised as stepper component which shows reg form in first app-launch
export function RegistrationScreen() {
  return (
    <UiStepper fullSize>
      <UiStepperContent>
        <UiStepperItem key={0}>
          <MainWelcomeStep />
        </UiStepperItem>

        <UiStepperItem key={1}>
          <BenefitsExplanationStep />
        </UiStepperItem>

        <UiStepperItem key={2}>
          <SignUpStep />
        </UiStepperItem>
      </UiStepperContent>

      <UiStepperPrev size="lg" />
      <UiStepperNext size="lg" />
    </UiStepper>
  );
}
