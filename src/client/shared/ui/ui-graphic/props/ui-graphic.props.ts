import type React from 'react';

export interface UiGraphicProps {
  src: string | React.ElementType<{ className?: string }>;
  alt?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  className?: string;
  priority?: boolean;
  type?: 'icon' | 'illustration' | 'image';
  objectFit?: 'contain' | 'cover';
}
