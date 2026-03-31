import { ReactNode } from 'react';

export interface GlassCardProps {
  icon: string | ReactNode;
  title: string;
  value: ReactNode;
  rotationClass?: string;
  className?: string;
}
