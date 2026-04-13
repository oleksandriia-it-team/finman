import { type UiGraphicProps } from '@frontend/ui/ui-graphic/props/ui-graphic.props';
import { cn } from '@frontend/shared/utils/cn.util';
import Image from 'next/image';
import React from 'react';

export const UiGraphic = ({
  src,
  size,
  width,
  height,
  className,
  priority = false,
  type = 'icon',
  alt = type === 'icon' ? '' : 'Graphic element',
}: UiGraphicProps) => {
  const finalWidth = size || width || (type === 'icon' ? 24 : 500);
  const finalHeight = size || height || (type === 'icon' ? 24 : 500);

  const isImageSource = typeof src === 'string' || (typeof src === 'object' && src !== null && 'src' in src);

  if (isImageSource) {
    if (typeof src === 'string' && src.startsWith('http:')) {
      console.warn(`UiGraphic: Використання незахищеного протоколу HTTP для ${src} може бути заблоковано.`);
    }

    return (
      <div
        className={cn('relative flex-shrink-0', className)}
        style={{ width: finalWidth, height: finalHeight }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          unoptimized={typeof src === 'string' && src.endsWith('.svg')}
          className="object-contain"
        />
      </div>
    );
  }
  return (
    <div
      className={cn('flex items-center justify-center flex-shrink-0', className)}
      style={{ width: finalWidth, height: finalHeight }}
    >
      {React.createElement(src as React.ComponentType<{ className?: string }>, {
        className: 'w-full h-full',
      })}
    </div>
  );
};
