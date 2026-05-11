import type { ReactNode } from 'react';

export interface ProfileSectionProps {
  title: string;
  children: ReactNode;
  className?: string | undefined;
}
