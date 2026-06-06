'use client';

import { useEffect } from 'react';
import { type ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { databaseLocalService } from '@frontend/database/database.local.service';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { seedLookups } from '@frontend/entities/lookups/lookups.seed';
import { isDevMode } from '@common/utils/is-dev-mode.util';

export default function InitApplication({ children }: ChildrenComponentProps) {
  const user = useUserInformation((state) => state.userInformation);

  useEffect(() => {
    if (user && !user?.online) {
      databaseLocalService
        .connect()
        .then(() => seedLookups())
        .catch((error) => {
          if (isDevMode()) {
            console.error('Failed to connect to local database:', error);
          }
        });

      if (navigator.storage?.persist) {
        navigator.storage.persist().catch((error) => {
          if (isDevMode()) {
            console.error('Lookup seeding failed:', error);
          }
        });
      }

      return () => {
        databaseLocalService.close();
      };
    }

    return;
  }, [user]);

  return children;
}
