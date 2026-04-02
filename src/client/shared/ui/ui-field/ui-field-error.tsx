import { useMemo } from 'react';

import './styles/ui-field-error-styles.scss';
import { cn } from '@frontend/shared/utils/cn.util';
import { FieldErrorProps } from '@frontend/ui/ui-field/props/field-error.props';

export function UiFieldError({ className, children, fieldState, ...props }: FieldErrorProps) {
  const showError = !!(fieldState.error?.message || fieldState.invalid);

  const content = useMemo(() => {
    const errors = [fieldState.error];

    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()];

    if (uniqueErrors?.length === 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul className="field-error-list">
        {uniqueErrors.map((error, index) => error?.message && <li key={index}>{error.message}</li>)}
      </ul>
    );
  }, [children, fieldState.error]);

  if (!content) {
    return null;
  }

  return (
    showError && (
      <div
        role="alert"
        data-slot="field-error"
        className={cn('field-error', className)}
        {...props}
      >
        {content}
      </div>
    )
  );
}
