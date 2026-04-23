import { UiGraphic } from '@frontend/ui/ui-graphic/ui-graphic';
import { cn } from '@frontend/shared/utils/cn.util';

interface ImageBlockProps {
  image: string;
  className?: string;
  children?: React.ReactNode;
}

export function ImageBlock({ image, className, children }: ImageBlockProps) {
  const classes = cn('relative size-full text-primary-foreground', className);

  return (
    <div className={classes}>
      <UiGraphic
        src={image}
        size="100%"
        objectFit="cover"
      />
      {children}
    </div>
  );
}

interface ImageBlockForegroundProps {
  blurred?: boolean;
  className?: string;
  title?: string;
  subtitle?: string;
  textClassname?: string;
}

export function ImageBlockForeground({ blurred = false, title, subtitle, className }: ImageBlockForegroundProps) {
  const wrapperClasses = cn(
    'absolute bottom-0 w-full h-20 bg-muted bg-muted/50',
    blurred && 'backdrop-blur-[2px]',
    className,
  );
  const textClasses = cn('pl-3 size-full flex flex-col justify-center', className);

  return (
    <div className={wrapperClasses}>
      <div className={textClasses}>
        <h3>
          <b>{title}</b>
        </h3>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}
