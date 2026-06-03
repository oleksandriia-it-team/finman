'use client';

import { useMemo, useState } from 'react';
import { ChartFiltersButton } from '@frontend/components/chart-filters-button/chart-filters-button';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiInput } from '@frontend/ui/ui-input/ui-input';
import { UiPopover } from '@frontend/ui/ui-popover/ui-popover';
import { UiPopoverContent } from '@frontend/ui/ui-popover/ui-popover-content';
import { UiPopoverTrigger } from '@frontend/ui/ui-popover/ui-popover-trigger';
import { UiIconBadge } from '@frontend/ui/ui-icon-badge/ui-icon-badge';
import { SelectableCardCheckbox } from '@frontend/entities/operations/selectable-card/checkbox/selectable-card-checkbox';
import { CategoriesMapping } from '@frontend/shared/styles/card-styles-mappings';
import { cn } from '@frontend/shared/utils/cn.util';
import type { AllCategories } from '@common/enums/categories.enum';
import { useTranslations } from 'next-intl';

interface CategoriesFilterDropdownProps {
  categories: AllCategories[];
  selected: AllCategories[];
  onChange: (next: AllCategories[]) => void;
}

export function CategoriesFilterDropdown({ categories, selected, onChange }: CategoriesFilterDropdownProps) {
  const t = useTranslations('analytics.categoryFilter');
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () => categories.filter((c) => CategoriesMapping[c].label.toLowerCase().includes(search.toLowerCase())),
    [categories, search],
  );

  const toggle = (category: AllCategories) => {
    onChange(selected.includes(category) ? selected.filter((c) => c !== category) : [...selected, category]);
  };

  return (
    <UiPopover
      open={open}
      onOpenChange={setOpen}
    >
      <UiPopoverTrigger asChild>
        <ChartFiltersButton
          icon="funnel"
          title={t('title')}
          counter={selected.length}
          size="sm"
        />
      </UiPopoverTrigger>
      <UiPopoverContent className="w-80 flex flex-col gap-2 p-3">
        <UiInput
          placeholder={t('searchPlaceholder')}
          value={search}
          onChange={(value) => setSearch(value ?? '')}
        />

        <ul
          role="listbox"
          aria-multiselectable
          className="flex flex-col gap-1 max-h-64 overflow-y-auto"
        >
          {filtered.map((category) => {
            const { icon, label, variant } = CategoriesMapping[category];
            const isSelected = selected.includes(category);
            return (
              <li key={category}>
                <label className="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-muted cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isSelected}
                    onChange={() => toggle(category)}
                  />
                  <SelectableCardCheckbox
                    selected={isSelected}
                    className={cn(
                      'size-5 rounded border border-muted-foreground flex items-center justify-center shrink-0',
                      isSelected && 'bg-primary border-primary',
                    )}
                  />
                  <UiIconBadge
                    name={icon}
                    variant={variant}
                    size="sm"
                  />
                  <span className="flex-1 text-sm">{label}</span>
                </label>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <UiButton
            type="button"
            variant="default"
            size="sm"
            onClick={() => onChange([])}
          >
            {t('clearAll')}
          </UiButton>
          <UiButton
            type="button"
            variant="primary"
            size="sm"
            onClick={() => setOpen(false)}
          >
            {t('done')}
          </UiButton>
        </div>
      </UiPopoverContent>
    </UiPopover>
  );
}
