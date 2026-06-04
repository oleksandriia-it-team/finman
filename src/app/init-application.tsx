'use client';

import { useEffect } from 'react';
import { type ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { databaseLocalService } from '@frontend/database/database.local.service';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';

export default function InitApplication({ children }: ChildrenComponentProps) {
  const user = useUserInformation((state) => state.userInformation);

  useEffect(() => {
    if (user && !user?.online) {
      databaseLocalService.connect();

      if (navigator.storage?.persist) {
        navigator.storage.persist().catch(() => {});
      }

      return () => {
        databaseLocalService.close();
      };
    }

    return;
  }, [user]);

  return children;
}
