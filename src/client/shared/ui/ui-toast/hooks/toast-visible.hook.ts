import { ToastVisibleProps } from '@frontend/ui/ui-toast/props/toast-visible.props';
import { createContext, useContext } from 'react';

export const ToastVisibleContext = createContext<ToastVisibleProps | undefined>(undefined);

export function useToastVisible() {
  const context = useContext(ToastVisibleContext);

  if (!context) {
    throw new Error('useToastVisible must be defined');
  }

  return context;
}
