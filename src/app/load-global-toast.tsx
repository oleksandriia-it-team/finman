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
    <>
      {list.map((toast, index) => (
        <UiToast
          key={toast.description}
          duration={toast.duration}
        >
          <UiToastContent
            variant={toast.variant}
            open
            onOpenChange={() => hideToast(index)}
          >
            <UiToastTitle>{toast.title}</UiToastTitle>
            <UiToastClose asChild>
              <UiIconButton
                icon="x"
                variant={toast.variant}
                isOutlined={false}
                aria-label="Закрити сповіщення"
                size="xs"
              />
            </UiToastClose>
            <UiToastDescription>{toast.description}</UiToastDescription>
          </UiToastContent>

          <UiToastViewport />
        </UiToast>
      ))}
    </>
  );
}
