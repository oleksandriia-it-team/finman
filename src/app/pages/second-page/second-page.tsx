'use client';

import ModalPassword from '../../../shared/сomponents/modal-password/modal-password';
import { useCallback, useEffect, useState } from 'react';
import { useInactivityTimer } from '../../../shared/hooks/use-inactivity-timer.hook';

export function SecondPage() {
  const [ unlocked, setUnlocked ] = useState(false);
  const [ maxTime, setMaxTime ] = useState<number>(0);

  const handleUnlock = (timeInMinutes: number, noLimit: boolean) => {
    const seconds = noLimit ? 0 : timeInMinutes * 60;
    setMaxTime(seconds);
    setUnlocked(true);
  };

  const handleTimeout = useCallback(() => {
    setUnlocked(false);
  }, []);

  const { timeLeft, reset } = useInactivityTimer(
    unlocked && maxTime > 0 ? maxTime * 1000 : 0,
    handleTimeout
  );

  useEffect(() => {
    if (unlocked && maxTime > 0) {
      reset();
    }
  }, [ unlocked, maxTime, reset ]);

  const formatMMSS = (s: number) =>
    `${ Math.floor(s / 60) }:${ String(s % 60).padStart(2, '0') }`;

  console.log(timeLeft);
  return (
    <div>
      { !unlocked && <ModalPassword onUnlock={ handleUnlock }/> }
      { unlocked && (
        <div>
          <h2>Unlock</h2>
          { maxTime > 0 && <p>Залишилось: { formatMMSS(timeLeft) }</p> }
        </div>
      ) }
    </div>
  );
}