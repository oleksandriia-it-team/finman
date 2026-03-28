import { cn } from '../../utils/cn.util';
import useEmblaCarousel from 'embla-carousel-react';
import { StepperApi, StepperProps } from '@frontend/ui/ui-stepper/props/stepper.props';
import { StepperContext } from './hooks/stepper-context.hook';
import { useCallback, useEffect, useState } from 'react';

export function UiStepper({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  fullSize,
  ...props
}: StepperProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((api: StepperApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (orientation === 'vertical') {
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === 'ArrowDown') {
          event.preventDefault();
          scrollNext();
        }
      } else {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          scrollNext();
        }
      }
    },
    [orientation, scrollPrev, scrollNext],
  );

  useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return () => {
      api?.off('reInit', onSelect);
      api?.off('select', onSelect);
    };
  }, [api, onSelect]);

  return (
    <StepperContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        fullSize,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown as never}
        className={cn('relative', className, fullSize && 'size-full')}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </StepperContext.Provider>
  );
}
