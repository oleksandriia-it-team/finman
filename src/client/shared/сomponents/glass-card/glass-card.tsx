'use client';

import clsx from 'clsx';
import { GlassCardProps } from './glass-card-props';

export default function GlassCard({ icon, title, value, rotationClass = '', className }: GlassCardProps) {
  return (
    <div
      className={clsx(
        'w-36 h-36 sm:w-52 sm:h-52',
        'p-4 rounded-4 text-center d-flex flex-column justify-content-center cursor-pointer',
        'bg-white/10 backdrop-blur-md border border-white/20',
        'transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]',
        'hover:-translate-y-6 hover:scale-110 hover:z-10 hover:shadow-2xl hover:border-white/50',
        rotationClass,
        className,
      )}
    >
      <div className="text-[3.5rem] leading-none">{icon}</div>
      <div className="mt-3">
        <div className="fw-bold text-body text-base">{title}</div>
        <div className="fw-bold mt-1 text-sm sm:text-lg">{value}</div>
      </div>
    </div>
  );
}
