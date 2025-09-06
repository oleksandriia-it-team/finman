'use client';
import React, { useState } from 'react';
import { LocalStorageService } from '../../../data-access/local-storage/local-storage.service';
import { UserInformationService } from '../../../data-access/user-information/user-information.service';

interface ModalPasswordProps {
  onUnlock: () => void;
}

export default function ModalPassword({ onUnlock }: ModalPasswordProps) {
  const localStorageService = new LocalStorageService();
  const userService = new UserInformationService(localStorageService);

  const savedPass = userService.getPassword();
  const savedMinutes = userService.getInactivityMinutes();

  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [minutes, setMinutes] = useState(savedMinutes?.toString() || '');
  const [noLimit, setNoLimit] = useState(savedMinutes === null);
  const [error, setError] = useState('');

  const handleAction = () => {
    if (!savedPass) {
      if (pass.length < 4) return setError('Мінімум 4 символи');
      if (pass !== confirm) return setError('Паролі не співпадають');
      userService.setPassword(pass);

      const min = noLimit ? null : parseInt(minutes);
      if (!noLimit && (!min || min < 1 || min > 120)) return setError('Час 1-120 хв');
      userService.setInactivityMinutes(min);
    } else if (pass !== savedPass) {
      return setError('Невірний пароль');
    }

    userService.setLastActivity(Date.now());
    onUnlock();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded w-80">
        <h2 className="font-bold mb-2">{savedPass ? 'Введіть пароль' : 'Створіть пароль'}</h2>

        <input
          type="password"
          placeholder="Пароль"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="border p-1 w-full mb-2"
        />

        {!savedPass && (
          <input
            type="password"
            placeholder="Підтвердити пароль"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="border p-1 w-full mb-2"
          />
        )}

        {!savedPass && (
          <div className="flex items-center mb-2">
            <input
              type="number"
              placeholder="Час неактивності (хв)"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              disabled={noLimit}
              className="border p-1 flex-1 mr-2"
              min={1}
              max={120}
            />
            <label className="flex items-center gap-1 text-sm">
              <input type="checkbox" checked={noLimit} onChange={(e) => setNoLimit(e.target.checked)} />
              Не обмежено
            </label>
          </div>
        )}

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button onClick={handleAction} className="bg-blue-500 text-white px-3 py-1 rounded w-full">
          OK
        </button>
      </div>
    </div>
  );
}
