import { useEffect } from 'react';
import { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { databaseService } from '@frontend/database/database.local.service';

export default function InitApplication({ children }: ChildrenComponentProps) {
  useEffect(() => {
    databaseService.connect();
  }, []);

  return children;
}
