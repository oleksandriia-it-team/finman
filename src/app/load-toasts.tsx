import { useToastHook } from '../client/shared/hooks/toast/toast.hook';
import ToastTemplate from '../client/shared/сomponents/toast/toast-template';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function LoadToasts() {
  const toasts = useToastHook((state) => state.toasts);

  const [parent] = useAutoAnimate();

  return (
    <div
      ref={parent}
      className="toast-container position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1055 }}
    >
      {toasts.map((toast) => (
        <ToastTemplate
          key={toast.id}
          config={toast}
        />
      ))}
    </div>
  );
}
