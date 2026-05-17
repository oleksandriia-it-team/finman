import type useEmblaCarousel from 'embla-carousel-react';
import { type StepperApi, type UseStepperParameters } from '@frontend/ui/ui-stepper/props/stepper.props';

type StepperOptions = UseStepperParameters[0];

export interface StepperContextProps {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: StepperApi;
  opts?: StepperOptions;
  orientation: 'horizontal' | 'vertical' | 'responsive';
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  fullSize?: boolean | undefined;
}
