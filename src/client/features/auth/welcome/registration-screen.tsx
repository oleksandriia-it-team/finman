'use client';

import Stepper from '../../../shared/сomponents/stepper/stepper';
import StepperItem from '../../../shared/сomponents/stepper/stepper-item';
import { useState } from 'react';
import RegistrationForm from './form/registration-form';
import MainWelcomeStep from './steps/main-welcome-page/main-welcome-step';
import BenefitsExplanationStep from './steps/benefits-explanation-step/benefits-explanation-step';
import SignUpStep from './steps/sign-up-step/sign-up-step';
//Page-component that meets user when launch app.
// Realised as stepper component which shows reg form in first app-launch

export default function RegistrationScreen() {
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
        <MainWelcomeStep />
      </StepperItem>

      <StepperItem
        className="size-full"
        currentStep={step}
        step={1}
      >
        <BenefitsExplanationStep />
      </StepperItem>

      <StepperItem
        className="size-full"
        currentStep={step}
        step={2}
      >
        <SignUpStep />
      </StepperItem>

      <StepperItem
        className="size-full"
        currentStep={step}
        step={3}
      >
        <div className="size-full">
          <RegistrationForm />
        </div>
      </StepperItem>
    </Stepper>
  );
}
