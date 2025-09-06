'use client';
import React, { useState, useEffect } from 'react';
import ModalPassword from '../../../shared/сomponents/modal-password/modal-password';
import { LocalStorageService } from '../../../data-access/local-storage/local-storage.service';
import { UserInformationService } from '../../../data-access/user-information/user-information.service';
import { useInactivityTimer } from './Logic/inactivity-timer';

const localStorageService = new LocalStorageService();
const userService = new UserInformationService(localStorageService);

export default function SecondPage() {
  const userKey = userService.getAllUserInformation()?.userName ?? 'guest';
  const unlockedKey = `unlocked_${userKey}`;

  const [unlocked, setUnlocked] = useState(
    localStorage.getItem(unlockedKey) === 'true'
  );

  const handleUnlock = () => {
    setUnlocked(true);
    localStorage.setItem(unlockedKey, 'true');
    userService.setLastActivity(Date.now());
  };

  // Таймер неактивності
  useInactivityTimer(() => {
    setUnlocked(false);
    localStorage.setItem(unlockedKey, 'false');
  });

  // Синхронізація між вкладками
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === unlockedKey) {
        setUnlocked(event.newValue === 'true');
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [unlockedKey]);

  return (
    <div className="p-6">
      {!unlocked && <ModalPassword onUnlock={handleUnlock} />}
      {unlocked && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Second Page</h1>
          <p>
            Користувач розблокований. Якщо буде відсутність активності — модальне
            вікно знову з’явиться.
          </p>
        </div>
      )}
    </div>
  );
}
