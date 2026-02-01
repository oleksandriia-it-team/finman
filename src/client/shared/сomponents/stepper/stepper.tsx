import { ChildrenComponentProps } from '../../models/component-with-chilren.model';
import StepperItem from './stepper-item';
import React, { useState } from 'react';

interface StepperProps {
  children: React.ReactNode;
  currentStep: number;
  changeSlide: (index: number) => void;
}

export default function Stepper({ children, currentStep, changeSlide }: StepperProps) {
  return (
    <div className="carousel slide">
      <div className="carousel-inner">{children}</div>
      <button
        onClick={() => changeSlide(currentStep + 1)}
        className="btn btn-primary"
      >
        next
      </button>
      <button
        onClick={() => changeSlide(currentStep - 1)}
        className="btn btn-primary"
      >
        prev
      </button>
    </div>
  );
}

export function Test() {
  const [active, setActive] = useState(0);

  return (
    <Stepper>
      <StepperItem isActive={true}>11222</StepperItem>
      <StepperItem>112222333</StepperItem>
      <StepperItem>1122255566</StepperItem>
    </Stepper>
  );
}
