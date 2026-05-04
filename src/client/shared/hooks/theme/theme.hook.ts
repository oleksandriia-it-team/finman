import { useEffect, useState } from 'react';
import { ThemeKey } from '@frontend/shared/constants/local-storage.contants';
import { ThemeEnum } from '@frontend/shared/enums/theme.enum';
import { localStorageService } from '@frontend/shared/services/local-storage/local-storage.service';
import { isServer } from '@frontend/shared/utils/is-server.util';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeEnum>(() => {
    if (isServer()) {
      return ThemeEnum.Light;
    }

    return localStorageService.getItem<ThemeEnum>(ThemeKey) ?? ThemeEnum.Light;
  });

  useEffect(() => {
    return localStorageService.subscribe<ThemeEnum>(ThemeKey, (nextTheme) => {
      setTheme(nextTheme ?? ThemeEnum.Light);
    });
  }, []);

  const changeTheme = (nextTheme: ThemeEnum) => {
    localStorageService.setItem(ThemeKey, nextTheme);
  };

  return {
    theme,
    changeTheme,
  };
}
