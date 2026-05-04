import type { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { type ReactNode } from 'react';

export interface ListScreenHandlerProps {
  skeleton?: (props: { className?: string }) => ReactNode;
  error?: ReactNode;
  notItemFound?: ReactNode;
  children: ReactNode;
  state: PromiseState;
  errorMessage?: string | undefined | null;
  hasData: boolean;
  skeletonItems: number;
  skeletonClassName?: string;
}
