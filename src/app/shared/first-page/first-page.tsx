'use client';

import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { useRef } from 'react';
import './styles/first-page.scss';
import FirstForm from './first-form';

export default function FirstPage() {
  const stepperRef = useRef(null);
  return (
    <div className="flex items-center">
      <Stepper className={ 'MyStepper' } ref={ stepperRef } style={ { flexBasis: '60rem' } }>
        <StepperPanel header="Header I">
          <div className=" border 1px flex items-center justify-center min-h-[60vh] ">
            <div className="flex-auto flex justify-center align-items-center font-medium"><FirstForm/></div>
          </div>
        </StepperPanel>
      </Stepper>
    </div>
  );
}