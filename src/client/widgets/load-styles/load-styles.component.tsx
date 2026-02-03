'use client';

import { ChildrenComponentProps } from '../../shared/models/component-with-chilren.model';
import { useUserInformation } from '../../entities/user-information/use-user-information.store';
import { ThemeEnum } from '../../shared/enums/theme.enum';
import { useEffect } from 'react';

export default function LoadStylesComponent({ children }: ChildrenComponentProps) {
  const mode = useUserInformation((state) => state.userInformation?.mode ?? ThemeEnum.Light);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', mode);
  }, [mode]);

  return <div>{children}</div>;
}
