import { cn } from '@frontend/shared/utils/cn.util';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import type { ColorVariantModel } from '@frontend/shared/models/color-variant.model';
import { UiButton } from '@frontend/ui/ui-button/ui-button';

export interface UiIconItem {
  value: string;
  label: string;
  icon: string;
  variant: ColorVariantModel;
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
          <UiButton
            key={item.value}
            title={item.label}
            onClick={() => onSelect(item.value)}
            variant={item.variant}
            borderNone={isSelected}
            isOutlined={!isSelected}
            className="!size-12"
          >
            <UiSvgIcon name={item.icon} />
          </UiButton>
        );
      })}
    </div>
  );
}
