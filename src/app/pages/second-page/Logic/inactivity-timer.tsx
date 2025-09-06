'use client';
import { useEffect } from 'react';
import { LocalStorageService } from '../../../../data-access/local-storage/local-storage.service';
import { UserInformationService } from '../../../../data-access/user-information/user-information.service';

const localStorageService = new LocalStorageService();
const userService = new UserInformationService(localStorageService);

export const useInactivityTimer = (onTimeout: () => void) => {
  useEffect(() => {
    const inactivityMinutes = userService.getInactivityMinutes();
    if (!inactivityMinutes) return;

    const inactivityLimit = inactivityMinutes * 60 * 1000;

    const resetTimer = () => userService.setLastActivity(Date.now());

    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach((e) => window.addEventListener(e, resetTimer));

    const interval = setInterval(() => {
      const last = userService.getLastActivity() || Date.now();
      const diff = Date.now() - last;

      if (diff >= inactivityLimit) {
        onTimeout(); // закінчився час → показати модалку
        resetTimer();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [onTimeout]);
};
