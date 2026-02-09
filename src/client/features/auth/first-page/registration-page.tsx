'use client';

import './styles/first-page.scss';
import Stepper from '../../../shared/сomponents/stepper/stepper';
import StepperItem from '../../../shared/сomponents/stepper/stepper-item';
import { useState } from 'react';
import RegistrationFormComponent from './form-component/registration-form-component';

//Page-component that meets user when launch app.
// Realised as stepper component which shows reg form in first app-launch

export default function RegistrationPage() {
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
        <div className="bg-red-100 size-full">
          <RegistrationFormComponent />
        </div>
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
