import type { ReactNode } from 'react';

export interface ResponsiveDialogProps {
  children: ReactNode;
  open?: boolean;
  openChange?: (open: boolean) => void;
}
