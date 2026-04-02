'use client';

import clsx from 'clsx';
import { GlassCardProps } from './props/glass-card-props';

import './styles/glass-card.scss';

export function UiGlassCard({ icon, title, value, rotationClass = '', className }: GlassCardProps) {
  return (
    <div
      className={clsx('p-4 rounded-2xl text-center flex flex-col justify-center glass-card', rotationClass, className)}
    >
      <div className="text-5xl leading-none">{icon}</div>
      <div className="mt-3">
        <div className="font-bold text-card-foreground text-base">{title}</div>
        <div className="font-bold mt-1 text-sm sm:text-lg">{value}</div>
      </div>
    </div>
  );
}
