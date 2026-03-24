'use client';

import clsx from 'clsx';
import { GlassCardProps } from './glass-card-props';

import './glass-card.scss';

export default function GlassCard({ icon, title, value, rotationClass = '', className }: GlassCardProps) {
  return (
    <div
      className={clsx(
        'p-4 rounded-4 text-center d-flex flex-column justify-content-center glass-card',
        rotationClass,
        className,
      )}
    >
      <div className="text-5xl leading-none">{icon}</div>
      <div className="mt-3">
        <div className="fw-bold text-body text-base">{title}</div>
        <div className="fw-bold mt-1 text-sm sm:text-lg">{value}</div>
      </div>
    </div>
  );
}
