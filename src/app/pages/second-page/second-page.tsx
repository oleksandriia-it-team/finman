'use client';


import ModalPassword from '../../../shared/сomponents/modal-password/modal-password';
import { useState } from 'react';
import { InactivityTimer } from '../../../shared/сomponents/inactivity-timer/inactivity-timer';



export function SecondPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [maxTime, setMaxTime] = useState<number>(0);

  const handleUnlock = (time: number, noLimit: boolean) => {
    setUnlocked(true);
    if (!noLimit) {
      setMaxTime(time*60);
    }
  };

  const handleTimeout = () => {
    setUnlocked(false);
  };

  return (
    <div>
      {!unlocked && <ModalPassword onUnlock={handleUnlock} />}
      {unlocked && (
        <div>
          <h2>Unlock</h2>
          {maxTime && <InactivityTimer maxTime={maxTime} onTimeout={handleTimeout} />}
        </div>
      )}
    </div>
  );
}