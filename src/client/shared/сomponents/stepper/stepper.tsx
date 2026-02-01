import { ChildrenComponentProps } from '../../models/component-with-chilren.model';
import StepperItem from './stepper-item';

export default function Stepper({ children }: ChildrenComponentProps) {
  return (
    <div className="carousel slide">
      <div className="carousel-inner">{children}</div>
      <button className="btn btn-primary">next</button>
      <button className="btn btn-primary">prev</button>
    </div>
  );
}

export function Test() {
  return (
    <Stepper>
      <StepperItem isActive={true}>11222</StepperItem>
      <StepperItem>112222333</StepperItem>
      <StepperItem>1122255566</StepperItem>
    </Stepper>
  );
}
