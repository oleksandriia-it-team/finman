import { useEffect } from 'react';
import { ChildrenComponentProps } from '../client/shared/models/component-with-chilren.model';
import { databaseService } from '../client/database/database.service';

export default function InitApplication({ children }: ChildrenComponentProps) {

  useEffect(() => {
    databaseService.connect();
  }, []);

  return children;
}