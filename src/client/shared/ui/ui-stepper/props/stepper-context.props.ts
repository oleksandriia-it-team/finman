import useEmblaCarousel from 'embla-carousel-react';
import { StepperProps } from '@frontend/ui/ui-stepper/props/stepper.props';

export interface StepperContextProps extends StepperProps {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  fullSize?: boolean | undefined;
}
