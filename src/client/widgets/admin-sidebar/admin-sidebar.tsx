'use client';

import Link from 'next/link';
import { useState, type MouseEvent } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiGraphic } from '@frontend/shared/ui/ui-graphic/ui-graphic';
import { LogoInverseSvg } from '@frontend/shared/svg/logo-inverse-svg';
import { LogoSvg } from '@frontend/shared/svg/logo-svg';
import { SidebarCountriesSvg } from '@frontend/shared/svg/sidebar-countries-svg';
import { SidebarCurrenciesSvg } from '@frontend/shared/svg/sidebar-currencies-svg';

const LookupNavItems = [
  { label: 'Країни та локалі', href: '/admin/lookups/countries', Icon: SidebarCountriesSvg, size: 28 },
  { label: 'Валюти', href: '/admin/lookups/currencies', Icon: SidebarCurrenciesSvg, size: 18 },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleBrandClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isExpanded) {
      event.preventDefault();
      setIsExpanded(true);
    }
  };

  return (
    <aside
      className={cn(
        'flex h-full shrink-0 flex-col border-r border-primary/15 bg-primary py-3 text-primary-foreground transition-all duration-300 ease-in-out',
        isExpanded ? 'w-[260px] px-2 md:w-[272px] md:px-2.5 lg:w-[304px] lg:px-3' : 'w-[80px] items-center px-0',
      )}
    >
      <div
        className={cn(
          'flex w-full items-start',
          isExpanded ? 'justify-between gap-2 md:gap-2.5 lg:gap-3' : 'justify-center',
        )}
      >
        {isExpanded ? (
          <button
            type="button"
            aria-label="Згорнути sidebar"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded(false)}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-sm transition-transform hover:scale-105"
          >
            <UiGraphic
              src={LogoSvg}
              size={30}
              className="shrink-0"
            />
          </button>
        ) : null}

        <Link
          href="/"
          aria-label="Головна"
          aria-expanded={isExpanded}
          onClick={handleBrandClick}
          className={cn(
            'flex items-center transition-transform hover:scale-105',
            isExpanded
              ? 'h-full flex-1 gap-2 rounded-2xl bg-background px-1.5 py-1 shadow-sm md:gap-2.5 md:px-2 lg:gap-3'
              : 'h-12 w-12 justify-center rounded-2xl bg-background shadow-sm',
          )}
        >
          <UiGraphic
            src={LogoInverseSvg}
            size={30}
            className="shrink-0"
          />

          {isExpanded ? (
            <span className="text-lg font-semibold leading-none tracking-[0.03em] text-primary md:text-xl lg:tracking-[0.04em]">
              FINMAN
            </span>
          ) : null}
        </Link>
      </div>

      <Link
        href="/profile"
        aria-label="Профіль"
        className={cn(
          'mt-10 flex items-center transition-transform hover:scale-105',
          isExpanded
            ? 'w-full gap-3 rounded-[24px] px-1 md:gap-3.5 lg:gap-4'
            : 'h-[35px] w-[35px] justify-center rounded-full',
        )}
      >
        <UiGraphic
          src="https://avatars.dicebear.com/api/initials/admin.svg"
          size={35}
          type="image"
          alt="Користувач"
          className={cn('overflow-hidden rounded-full', isExpanded ? 'ring-0' : 'ring-2 ring-background/20')}
        />

        {isExpanded ? (
          <div className="min-w-0 text-background">
            <div className="truncate text-sm font-semibold leading-tight md:text-base">Main-Admin</div>
            <div className="truncate text-sm leading-tight text-background/85">Профіль</div>
          </div>
        ) : null}
      </Link>

      <nav
        aria-label="Lookup navigation"
        className={cn(
          'mt-10 flex flex-1 flex-col border border-background/20',
          isExpanded
            ? 'w-full gap-2 rounded-none px-2 py-3 md:px-2.5 md:py-3.5 lg:px-3 lg:py-4'
            : 'w-full items-center gap-4 rounded-[18px] bg-background/10 px-2 py-3',
        )}
      >
        {isExpanded ? (
          <div className="px-2 pb-2.5 text-xs font-semibold uppercase tracking-[0.07em] text-background/85 md:text-sm lg:pb-3 lg:tracking-[0.08em]">
            Довідники
          </div>
        ) : null}

        {LookupNavItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              title={item.label}
              className={cn(
                'flex items-center transition-colors',
                isExpanded
                  ? 'h-[44px] w-full gap-[3px] rounded-[6px] px-3 py-2 text-sm font-medium md:h-[46px] md:px-[14px] md:text-base lg:px-[18px]'
                  : 'h-[46px] w-[57px] justify-center rounded-[6px]',
                isActive
                  ? isExpanded
                    ? 'bg-primary-foreground/15 text-background'
                    : 'bg-background/10 text-background'
                  : isExpanded
                    ? 'text-background/85 hover:bg-primary-foreground/10 hover:text-background'
                    : 'text-primary-foreground/75 hover:bg-background/10 hover:text-primary-foreground',
              )}
            >
              <span className={cn('flex shrink-0 items-center justify-center', isExpanded ? 'w-7' : '')}>
                <UiGraphic
                  src={item.Icon}
                  size={item.size}
                  className="shrink-0"
                />
              </span>

              {isExpanded ? <span className="truncate">{item.label}</span> : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
