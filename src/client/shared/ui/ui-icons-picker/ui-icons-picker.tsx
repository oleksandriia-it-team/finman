import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { cn } from '@frontend/shared/utils/cn.util';

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
          <UiIconButton
            key={item.value}
            icon={item.icon}
            title={item.label}
            isOutlined={false}
            bgNone={false}
            isRoundedFull={false}
            onClick={() => onSelect(item.value)}
            style={isSelected ? { backgroundColor: item.bgColor, color: item.textColor } : undefined}
            className={cn(
              'p-3 rounded-2xl transition-all border-2',
              isSelected
                ? 'border-primary scale-110 shadow-md'
                : 'bg-secondary text-muted-foreground border-transparent hover:bg-accent',
            )}
          />
        );
      })}
    </div>
  );
}
