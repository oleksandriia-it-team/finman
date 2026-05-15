import type { UiFilterTabsProps } from '@frontend/components/filter-tabs/props/filter-tabs.props';
import { UiTabItem } from '@frontend/ui/ui-tab-item/ui-tab-item';

export function UiFilterTabs<TValue>({
  tabs,
  activeValue,
  onChange,
  withDot = false,
  withCount = false,
  withIcon = false,
}: UiFilterTabsProps<TValue>) {
  return (
    <div className="flex gap-4 border-b border-border">
      {tabs.map((tab, index) => {
        const isActive = activeValue === tab.value;

        return (
          <UiTabItem
            // Якщо value undefined, використовуємо індекс як ключ
            key={tab.value !== undefined ? String(tab.value) : `tab-all-${index}`}
            isActive={isActive}
            onClick={() => onChange(tab.value)}
            className="flex items-center gap-2 pb-2 text-sm"
          >
            {/* кольорова крапка (якщо увімкнено і передано колір) */}
            {withDot && tab.dotColor && <span className={`w-2 h-2 rounded-full ${tab.dotColor}`} />}

            {/* можливість додати іконку якщо вона є компонентом (якщо увімкнено) */}
            {withIcon && tab.icon && <span className="flex items-center justify-center text-current">{tab.icon}</span>}

            <span className="font-medium">{tab.label}</span>

            {/* можливість додати лічильник (якщо увімкнено і є число) */}
            {withCount && tab.count !== undefined && (
              <span
                className={`px-2 py-0.5 text-[10px] font-bold rounded-full transition-colors ${
                  isActive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                }`}
              >
                {tab.count}
              </span>
            )}
          </UiTabItem>
        );
      })}
    </div>
  );
}
