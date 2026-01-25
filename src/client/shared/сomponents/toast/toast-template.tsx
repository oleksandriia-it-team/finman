import { ToastProps } from './props/toast.props';
import { useToastHook } from '../../hooks/toast/toast.hook';
import { useEffect } from 'react';

export default function ToastTemplate({ config }: ToastProps) {
  const removeToast = useToastHook((state) => state.removeToast);
  useEffect(() => {
    if (!config.duration) return;
    const timer = setTimeout(() => {
      removeToast(config.id);
    }, config.duration);
    return () => clearTimeout(timer);
  }, [config.duration, config.id, removeToast]);

  return (
    <div
      className="toast show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <strong className="me-auto">{config.title}</strong>
        <button
          type="button"
          onClick={() => removeToast(config.id)}
          className="btn-close"
          aria-label="Close"
        />
      </div>
      <div className="toast-body">{config.message}</div>
    </div>
  );
}
