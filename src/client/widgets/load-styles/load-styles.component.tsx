'use client';

import { type ChildrenComponentProps } from '../../shared/models/component-with-chilren.model';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { ThemeEnum } from '../../shared/enums/theme.enum';
import { useEffect } from 'react';
import { isServer } from '@frontend/shared/utils/is-server.util';

export default function LoadStylesComponent({ children }: ChildrenComponentProps) {
  const mode = useUserInformation((state) => state.userInformation?.mode ?? ThemeEnum.Light);

  useEffect(() => {
    if (isServer()) {
      return;
    }

    if (mode === ThemeEnum.Dark) document.documentElement.classList.add(ThemeEnum.Dark);
    else document.documentElement.classList.remove(ThemeEnum.Dark);
  }, [mode]);

  return <main className="flex flex-col w-screen h-screen">{children}</main>;
}
