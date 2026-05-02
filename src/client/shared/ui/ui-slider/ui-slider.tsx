'use client';

import * as React from 'react';
import { Slider as SliderPrimitive } from 'radix-ui';
import { type SliderProps } from './props/slider.props';

import './styles/slider-styles.scss';

// Cast to relax exactOptionalPropertyTypes constraint on value / defaultValue (Radix types value?: number[])
const SliderRoot = SliderPrimitive.Root as React.ComponentType<
  Omit<React.ComponentProps<typeof SliderPrimitive.Root>, 'value' | 'defaultValue'> & {
    value?: number[] | undefined;
    defaultValue?: number[] | undefined;
  }
>;

function UiSlider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  variant = 'primary',
  size = 'default',
  ...props
}: SliderProps) {
  const _values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max],
  );

  return (
    <SliderRoot
      data-slot="slider"
      data-variant={variant}
      data-size={size}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={`slider${className ? ` ${className}` : ''}`}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="slider-track"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="slider-range"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="slider-thumb"
        />
      ))}
    </SliderRoot>
  );
}

export { UiSlider };
