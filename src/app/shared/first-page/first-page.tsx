'use client';

import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import {useRef} from 'react';
import './styles/first-page.scss'
import FirstForm from './first-form'
import PageButton from '../../../shared/сomponents/page-button/page-button';

export default function FirstPage() {
  const stepperRef = useRef(null);
  return (
    <div className="flex items-center">
      <Stepper className={'MyStepper'} ref={stepperRef}>
        <StepperPanel header="Page I">
          <div className=" border 1px flex items-center justify-center ">
            <div className="flex-auto flex justify-center align-items-center font-medium"><FirstForm/></div>
            <PageButton onClick={() => stepperRef.current.nextCallback()}/>
          </div>
        </StepperPanel>
        <StepperPanel header="Page 2">
          <div className=" border 1px flex items-center justify-center ">
            <div className="flex-auto flex justify-center align-items-center font-medium"><FirstForm/></div>
            <PageButton className='scale-x-[-1]' onClick={() => stepperRef.current.prevCallback()}/>
          </div>
        </StepperPanel>
      </Stepper>
    </div>
  );
}