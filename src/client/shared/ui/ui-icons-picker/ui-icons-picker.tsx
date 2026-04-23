import { cn } from '@frontend/shared/utils/cn.util';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

export interface UiIconItem {
  value: string;
  label: string;
  icon: string;
  bgColor: string;
  textColor: string;
}

interface UiIconsPickerProps {
  items: UiIconItem[];
  value?: string;
  onSelect: (value: string) => void;
}

export function UiIconsPicker({ items, value, onSelect }: UiIconsPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const isSelected = value === item.value;

        return (
          <button
            type="button"
            key={item.value}
            title={item.label}
            onClick={() => onSelect(item.value)}
            style={
              isSelected
                ? { backgroundColor: item.bgColor, color: item.textColor, borderColor: item.textColor }
                : undefined
            }
            className={cn(
              'p-3 rounded-2xl transition-all border-2 cursor-pointer',
              isSelected
                ? 'scale-110 shadow-md'
                : 'bg-secondary text-muted-foreground border-transparent hover:bg-accent',
            )}
          >
            <UiSvgIcon name={item.icon} />
          </button>
        );
      })}
    </div>
  );
}
