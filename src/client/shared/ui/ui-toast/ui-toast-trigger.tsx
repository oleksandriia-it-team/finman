import { ToastTriggerProps } from '@frontend/ui/ui-toast/props/toast-trigger.props';
import { Slot } from 'radix-ui';
import { useToastVisible } from '@frontend/ui/ui-toast/hooks/toast-visible.hook';

export function UiToastTrigger({ asChild, ...props }: ToastTriggerProps) {
  const { onOpenChange } = useToastVisible();

  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      {...props}
      onClick={onOpenChange}
    />
  );
}
