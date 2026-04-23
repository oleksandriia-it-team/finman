import { useEffect } from 'react';
import { type ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { databaseLocalService } from '@frontend/database/database.local.service';

export default function InitApplication({ children }: ChildrenComponentProps) {
  useEffect(() => {
    databaseLocalService.connect();
  }, []);

  return children;
}
