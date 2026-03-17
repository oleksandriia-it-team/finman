'use client';

import Stepper from '../../../shared/сomponents/stepper/stepper';
import StepperItem from '../../../shared/сomponents/stepper/stepper-item';
import { useState } from 'react';
import RegistrationFormComponent from './form-component/registration-form-component';
import FirstPage from '../../welcome-pages/welcome-page-1/welcome-page-1';
import SecondPage from '../../welcome-pages/welcome-page-2/welcome-page-2';
import ThirdPage from '../../welcome-pages/welcome-page-3/welcome-page-3';
//Page-component that meets user when launch app.
// Realised as stepper component which shows reg form in first app-launch

export default function RegistrationPage() {
  const [step, setStep] = useState<number>(0);

  return (
    <Stepper
      setStep={setStep}
      currentStep={step}
    >
      <StepperItem className="size-full">
        <FirstPage />
      </StepperItem>

      <StepperItem className="size-full">
        <SecondPage />
      </StepperItem>

      <StepperItem className="size-full">
        <ThirdPage />
      </StepperItem>

      <StepperItem className="size-full">
        <div className="bg-red-100 size-full">
          <RegistrationFormComponent />
        </div>
      </StepperItem>
    </Stepper>
  );
}
