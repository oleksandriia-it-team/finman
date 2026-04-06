import { UiGraphicProps } from '@frontend/ui/ui-graphic/props/ui-graphic.props';
import { cn } from '@frontend/shared/utils/cn.util';
import Image from 'next/image';
import React from 'react';

export const UiGraphic = ({
  src,
  alt = 'Graphic element',
  size,
  width,
  height,
  className,
  priority = false,
  type = 'icon',
}: UiGraphicProps) => {
  const finalWidth = size || width || (type === 'icon' ? 24 : 500);
  const finalHeight = size || height || (type === 'icon' ? 24 : 500);

  if (typeof src === 'string') {
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
          unoptimized={src.endsWith('.svg')}
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
      {React.createElement(src, { className: 'w-full h-full' })}
    </div>
  );
};
