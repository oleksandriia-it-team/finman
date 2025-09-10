'use client'

import { inactivityTimerProps } from '../../models/inactivity-timer-props.model';
import { useState } from 'react';
import { useEffect } from 'react';

export function InactivityTimer({ maxTime, onTimeout }: inactivityTimerProps) {
  const [timeLeft, setTimeLeft] = useState(maxTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimeout]);

  return <p>Left {timeLeft} sec</p>;
}