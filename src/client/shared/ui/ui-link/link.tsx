import { LinkProps, LinkVariant } from './props/link.props';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ChildrenComponentProps } from '../../models/component-with-chilren.model';
import { cn } from '../../utils/cn.util';

const variants: Record<LinkVariant, string> = {
  danger: 'link-danger',
  default: '!text-spell-basic',
  revert: '!text-spell-revert',
  warning: 'link-warning',
  info: 'link-info',
  success: 'link-success',
};

export function UiLink({
  underlined = false,
  className,
  children,
  variant,
  onClick,
  href,
}: LinkProps & ChildrenComponentProps) {
  const router = useRouter();

  const classes = useMemo(() => {
    return cn(className, underlined && '!no-underline', variants[variant]);
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
