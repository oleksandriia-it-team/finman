import StepperItem from './stepper-item';
import React, { Children, useState } from 'react';
import SvgIcon from '../svg-icon/svg-icon';

interface StepperProps {
  children: React.ReactNode;
  currentStep: number;
  changeSlide: (index: number) => void;
}

export default function Stepper({ children, currentStep, changeSlide }: StepperProps) {
  const count: number = Children.count(children);

  return (
    <div className="carousel slide w-full h-full">
      <div className="carousel-inner h-full w-full flex items-center">{children}</div>
      <button
        onClick={() => changeSlide((currentStep + 1) % count)}
        className="carousel-control-prev  "
      >
        <SvgIcon
          size="large"
          name="arrow-left-short"
          className="text-black"
        />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        onClick={() => changeSlide((currentStep - 1 + count) % count)}
        className="carousel-control-next "
      >
        <SvgIcon
          size="large"
          name="arrow-right-short"
          className="text-black"
        />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export function Test() {
  const [active, setActive] = useState(0);

  return (
    <Stepper
      currentStep={active}
      changeSlide={setActive}
    >
      <StepperItem isActive={active === 0}>
        <div>11222</div>
      </StepperItem>
      <StepperItem isActive={active === 1}>112222333</StepperItem>
      <StepperItem isActive={active === 2}>1122255566</StepperItem>
    </Stepper>
  );
}
