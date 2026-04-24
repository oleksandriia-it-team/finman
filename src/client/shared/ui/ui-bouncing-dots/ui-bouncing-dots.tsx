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
        @keyframes bounce-custom {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-10px); /* Висота стрибка */
            opacity: 1;
          }
        }

        .animate-bounce-custom {
          animation: bounce-custom 0.8s infinite ease-in-out;
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
