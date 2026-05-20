import type { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { type ReactNode } from 'react';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';

export interface ListScreenHandlerProps {
  skeleton?: (props: { className?: string }) => ReactNode;
  error?: ReactNode;
  notItemFound?: ReactNode;
  children: ReactNode;
  state: PromiseState;
  appError?: ApiResultOperationError | null | undefined;
  hasData: boolean;
  skeletonItems: number;
  skeletonClassName?: string;
}
