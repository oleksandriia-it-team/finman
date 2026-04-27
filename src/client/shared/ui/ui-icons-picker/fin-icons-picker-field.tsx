import { useController, useFormContext } from 'react-hook-form';
import { type UiIconItem, UiIconsPicker } from '@frontend/ui/ui-icons-picker/ui-icons-picker';

interface IconPickerFieldProps {
  name: string;
  items: UiIconItem[];
  onSelect?: (value: string, label: string) => void;
}

export function IconPickerField({ name, items, onSelect }: IconPickerFieldProps) {
  const { control } = useFormContext();
  const { field } = useController({ name, control });

  const handleSelect = (value: string) => {
    field.onChange(value);
    const label = items.find((i) => i.value === value)?.label ?? '';
    onSelect?.(value, label);
  };

  return (
    <UiIconsPicker
      items={items}
      value={field.value}
      onSelect={handleSelect}
    />
  );
}
