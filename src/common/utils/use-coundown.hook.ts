import { useCallback, useEffect, useState } from 'react';

export const useCountdown = (initialSeconds: number) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const start = useCallback(() => {
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  return {
    timeLeft,
    startCountdown: start,
    isCounting: timeLeft > 0,
  };
};
