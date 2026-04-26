'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UiGraphic } from '@frontend/ui/ui-graphic/ui-graphic';
import { cn } from '@frontend/shared/utils/cn.util';

const LOOKUP_NAV_ITEMS = [
  { label: 'Країни та локалі', href: '/admin/lookups/countries' },
  { label: 'Валюти', href: '/admin/lookups/currencies' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 h-full flex flex-col bg-sidebar border-r border-sidebar-border shrink-0">
      <div className="flex items-center gap-2 px-4 py-4 border-b border-sidebar-border">
        <UiGraphic
          src="/logo/finman-icon.svg"
          size={30}
          priority
          alt="Finman Logo"
        />
        <span className="text-xl font-bold tracking-tighter text-sidebar-foreground">FINMAN</span>
      </div>

      <nav
        aria-label="Lookup navigation"
        className="flex flex-col gap-0.5 p-3 flex-1"
      >
        <p className="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Довідники</p>

        {LOOKUP_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
