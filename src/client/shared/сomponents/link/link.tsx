import { LinkModel, LinkVariant } from './models/link.model';
import { useMemo } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

const variants: Record<LinkVariant, string> = {
  danger: 'link-danger',
  default: '!text-spell-basic',
  revert: '!text-spell-revert',
  warning: 'link-warning',
  info: 'link-info',
  success: 'link-success',
};

export default function Link({ underlined = false, className, children, variant, onClick, href }: LinkModel) {
  const router = useRouter();

  const classes = useMemo(() => {
    return clsx(className, underlined && '!no-underline', variants[variant]);
  }, [className, underlined, variant]);

  return (
    <a
      className={classes}
      href="#"
      onClick={(e) => {
        e.preventDefault();

        if (onClick) {
          onClick();
        } else if (href) {
          router.push(href);
        }
      }}
    >
      {children}
    </a>
  );
}
