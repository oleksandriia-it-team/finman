'use client';

import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { useRef } from 'react';
import './styles/first-page.scss';
import FirstForm from './first-form';
import PageButton from '../../../shared/сomponents/page-button/page-button';

//Page-component that meets user when launch app.
// Realised as stepper component which shows reg form in first app-launch
//TODO: remake stepper

export default function FirstPage() {
  const stepperRef = useRef<Stepper | null>(null);
  return (
    <div className="flex items-center h-full ">
      <Stepper className={ 'MyStepper ' } ref={ stepperRef }>
        <StepperPanel header="Page I">
          <div className=" Content flex items-center justify-center ">
            <div className=" flex-auto flex justify-center align-items-center font-medium"><FirstForm/></div>
            <PageButton onClick={ () => stepperRef.current?.nextCallback() }/>
          </div>
        </StepperPanel>
        <StepperPanel header="Page 2">
          <div className="Content flex items-center justify-center ">
            <div className=" flex-auto flex justify-center align-items-center font-medium"><FirstForm/></div>
            <PageButton className="scale-x-[-1]" onClick={ () => stepperRef.current?.prevCallback() }/>
          </div>
        </StepperPanel>
      </Stepper>
    </div>
  );
}