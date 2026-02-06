import { useEffect, useRef, useState } from 'react';
import { BootstrapAnimationResult } from './models/bootstrap-animation-result.model';

/**
 * A hook to manage Bootstrap-style entry and exit animations.
 *
 * It handles the mounting/unmounting delay required for CSS transitions to play,
 * and preserves the data (like a modal template) during the exit animation
 * so the content doesn't disappear instantly.
 *
 * @param show - Determines whether the component should be visible.
 * @param duration - The duration of the exit animation in milliseconds.
 * @param initialShouldRender - The initial state of the shouldRender flag.
 * @param animatedData - Data dependencies that need to be preserved during the exit animation.
 * @returns An object containing flags for rendering and the preserved data.
 */
export function useBootstrapAnimation<T extends Array<unknown>>(
  show: boolean,
  duration: number,
  initialShouldRender: boolean,
  ...animatedData: T
): BootstrapAnimationResult<T> {
  const [shouldRender, setShouldRender] = useState(initialShouldRender);
  const [showElement, setShowElement] = useState(false);
  const necessaryAnimatedData = useRef<T>(animatedData);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      necessaryAnimatedData.current = animatedData;
      const timer = setTimeout(() => setShowElement(true), 50);
      return () => clearTimeout(timer);
    } else {
      setShowElement(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
        necessaryAnimatedData.current = animatedData;
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, animatedData, duration]);

  return {
    shouldRender,
    showElement,
    animatedData: necessaryAnimatedData.current,
  };
}
