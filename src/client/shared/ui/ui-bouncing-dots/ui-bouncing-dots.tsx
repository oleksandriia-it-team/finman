import type { ComponentProps } from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiBouncingDots({
  className,
  dotClassName = 'size-3',
  ...props
}: Omit<ComponentProps<'div'> & { dotClassName?: string }, 'children'>) {
  return (
    <div
      className={cn('flex items-center justify-center space-x-2', className)}
      {...props}
    >
      <style>{`
        .animate-bounce-custom {
          animation: bounceCustom 0.8s infinite ease-in-out;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      <div className={cn('bg-primary rounded-full animate-bounce-custom delay-100', dotClassName)} />

      <div className={cn('bg-primary rounded-full animate-bounce-custom delay-200', dotClassName)} />

      <div className={cn('bg-primary rounded-full animate-bounce-custom delay-300', dotClassName)} />
    </div>
  );
}
