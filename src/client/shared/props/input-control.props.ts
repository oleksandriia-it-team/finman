import type { ReactNode } from 'react';

export interface InputControlProps {
  name: string;
  label?: string | ReactNode;
  showErrors?: boolean;
  disabled?: boolean;
}
