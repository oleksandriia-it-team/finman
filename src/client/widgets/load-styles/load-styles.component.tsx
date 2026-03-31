'use client';

import { ChildrenComponentProps } from '../../shared/models/component-with-chilren.model';
import { useUserInformation } from '../../entities/user-information/use-user-information.store';
import { ThemeEnum } from '../../shared/enums/theme.enum';
import { useEffect } from 'react';

export default function LoadStylesComponent({ children }: ChildrenComponentProps) {
  const mode = useUserInformation((state) => state.userInformation?.mode ?? ThemeEnum.Light);

  useEffect(() => {
    if (mode === ThemeEnum.Dark) document.documentElement.classList.add(ThemeEnum.Dark);
    else document.documentElement.classList.remove(ThemeEnum.Dark);
  }, [mode]);

  return <div>{children}</div>;
}
