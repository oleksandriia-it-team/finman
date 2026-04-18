'use client';

import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import { useShallow } from 'zustand/react/shallow';
import { UiToast } from '@frontend/ui/ui-toast/ui-toast';
import { UiToastContent } from '@frontend/ui/ui-toast/ui-toast-content';
import { UiToastTitle } from '@frontend/ui/ui-toast/ui-toast-title';
import { UiToastDescription } from '@frontend/ui/ui-toast/ui-toast-description';
import { UiToastViewport } from '@frontend/ui/ui-toast/ui-toast-viewport';
import { UiToastClose } from '@frontend/ui/ui-toast/ui-toast-close';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';

export function LoadGlobalToast() {
  const { list, hideToast } = useGlobalToast(useShallow((state) => ({ list: state.list, hideToast: state.hideToast })));

  return (
    <UiToast duration={5000}>
      {list.map((toast) => (
        <UiToastContent
          key={toast.id}
          variant={toast.variant}
          open
          onOpenChange={() => hideToast(toast.id)}
        >
          <UiToastTitle>{toast.title}</UiToastTitle>
          <UiToastClose asChild>
            <UiIconButton
              icon="x"
              variant={toast.variant}
              isOutlined={0}
              aria-label="Закрити сповіщення"
              size="xs"
            />
          </UiToastClose>
          <UiToastDescription>{toast.description}</UiToastDescription>
        </UiToastContent>
      ))}

      <UiToastViewport />
    </UiToast>
  );
}
