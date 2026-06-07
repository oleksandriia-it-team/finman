'use client';

import { useEffect, useState } from 'react';
import { type ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { databaseLocalService } from '@frontend/database/database.local.service';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { seedLookups } from '@frontend/entities/lookups/lookups.seed';
import { isDevMode } from '@common/utils/is-dev-mode.util';

export default function InitApplication({ children }: ChildrenComponentProps) {
  const user = useUserInformation((state) => state.userInformation);

  // For offline users we must connect Dexie BEFORE children mount so that
  // data-source calls (React Query, etc.) don't hit an uninitialised DB.
  const isOfflineUser = Boolean(user && !user.online);
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    if (!isOfflineUser) return;

    databaseLocalService
      .connect()
      .then(() => seedLookups())
      .then(() => setDbReady(true))
      .catch((error) => {
        if (isDevMode()) {
          console.error('Failed to connect to local database:', error);
        }
        // Still unblock children even on error so the app doesn't hang.
        setDbReady(true);
      });

    if (navigator.storage?.persist) {
      navigator.storage.persist().catch((error) => {
        if (isDevMode()) {
          console.error('Storage persist failed:', error);
        }
      });
    }

    return () => {
      databaseLocalService.close();
    };
  }, [isOfflineUser]);

  // Hold back the whole subtree until Dexie is open for offline users.
  // For online users render immediately (no Dexie needed).
  if (isOfflineUser && !dbReady) return null;

  return children;
}
