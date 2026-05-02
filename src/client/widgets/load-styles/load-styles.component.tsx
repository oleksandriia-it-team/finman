'use client';

import { type ChildrenComponentProps } from '../../shared/models/component-with-chilren.model';
import { ThemeEnum } from '../../shared/enums/theme.enum';
import { useEffect, useState } from 'react';
import { isServer } from '@frontend/shared/utils/is-server.util';
import { localStorageService } from '@frontend/shared/services/local-storage/local-storage.service';
import { ThemeKey } from '@frontend/shared/constants/local-storage.contants';

export default function LoadStylesComponent({ children }: ChildrenComponentProps) {
  const [mode, setMode] = useState<ThemeEnum>(ThemeEnum.Light);

  useEffect(() => {
    setMode(localStorageService.getItem<ThemeEnum>(ThemeKey) ?? ThemeEnum.Light);

    const handleThemeChange = () => {
      setMode(localStorageService.getItem<ThemeEnum>(ThemeKey) ?? ThemeEnum.Light);
    };

    window.addEventListener('storage', handleThemeChange);
    window.addEventListener('finman-theme-change', handleThemeChange);

    return () => {
      window.removeEventListener('storage', handleThemeChange);
      window.removeEventListener('finman-theme-change', handleThemeChange);
    };
  }, []);

  useEffect(() => {
    if (isServer()) {
      return;
    }

    if (mode === ThemeEnum.Dark) document.documentElement.classList.add(ThemeEnum.Dark);
    else document.documentElement.classList.remove(ThemeEnum.Dark);
  }, [mode]);

  return <main className="flex flex-col w-screen h-screen">{children}</main>;
}
