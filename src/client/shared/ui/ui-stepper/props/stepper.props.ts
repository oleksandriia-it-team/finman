import { type ComponentDefaultProps } from '../../../props/component.props';
import type useEmblaCarousel from 'embla-carousel-react';
import { type UseEmblaCarouselType } from 'embla-carousel-react';

export type StepperApi = UseEmblaCarouselType[1];
export type UseStepperParameters = Parameters<typeof useEmblaCarousel>;
type StepperOptions = UseStepperParameters[0];
type StepperPlugin = UseStepperParameters[1];

export interface StepperProps extends ComponentDefaultProps {
  opts?: StepperOptions;
  plugins?: StepperPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: StepperApi) => void;
  fullSize?: boolean | undefined;
}
