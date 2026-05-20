import type { ReactNode } from 'react';

export interface FinModalFormWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  formId: string;
  isLoading?: boolean;
  children: ReactNode;
  className?: string;
}
