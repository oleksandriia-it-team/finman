// src/client/shared/ui/ui-stepper/ui-stepper.tsx
import { cn } from '../../utils/cn.util';
import useEmblaCarousel from 'embla-carousel-react';
import { type StepperApi, type StepperProps } from '@frontend/ui/ui-stepper/props/stepper.props';
import { StepperContext } from './hooks/stepper-context.hook';
import { type KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react';

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
      const target = event.target as HTMLElement;
      const interactiveTags = ['INPUT', 'TEXTAREA', 'SELECT', 'OPTION', 'BUTTON'];

      if (
        interactiveTags.includes(target.tagName) ||
        target.isContentEditable ||
        target.closest('[role="textbox"], [role="listbox"], [role="combobox"], [role="spinbutton"]')
      ) {
        return;
      }

      if (orientation === 'vertical') {
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === 'ArrowDown') {
          event.preventDefault();
          scrollNext();
        }
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
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

  const contextValue = useMemo(
    () => ({
      carouselRef,
      api,
      opts,
      orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
      fullSize,
    }),
    [carouselRef, api, opts, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext, fullSize],
  );

  return (
    <StepperContext.Provider value={contextValue}>
      <section
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className, fullSize && 'size-full')}
        aria-label="carousel"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </section>
    </StepperContext.Provider>
  );
}
