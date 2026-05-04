'use client';

import { type ChildrenComponentProps } from '../../shared/models/component-with-chilren.model';
import { ThemeEnum } from '../../shared/enums/theme.enum';
import { useEffect } from 'react';
import { isServer } from '@frontend/shared/utils/is-server.util';
import { useTheme } from '@frontend/shared/hooks/theme/theme.hook';

export default function LoadStylesComponent({ children }: ChildrenComponentProps) {
  const { theme } = useTheme();

  useEffect(() => {
    if (isServer()) {
      return;
    }

    if (theme === ThemeEnum.Dark) document.documentElement.classList.add(ThemeEnum.Dark);
    else document.documentElement.classList.remove(ThemeEnum.Dark);
  }, [theme]);

  return <main className="flex flex-col w-screen h-screen">{children}</main>;
}
