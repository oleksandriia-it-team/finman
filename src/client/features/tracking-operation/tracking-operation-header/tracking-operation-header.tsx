'use client';

import { useState, useEffect, useRef } from 'react';
import { FormProvider } from 'react-hook-form';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { FiltersSheet } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-sheet';
import { useTrackingOperationFilters } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-hooks/tracking-operation-filters.hook';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { SearchDebounceConstant } from '@frontend/shared/constants/debounce.constant';
import './tracking-operation-header.scss';

export function TrackingOperationHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { methods, handleApplyFilters } = useTrackingOperationFilters();
  const searchValue = methods.watch('search') ?? '';

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      handleApplyFilters();
    }, SearchDebounceConstant);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchValue]);

  const handleSearchToggle = () => {
    if (isSearchOpen) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      methods.setValue('search', '');
      handleApplyFilters();
    }
    setIsSearchOpen((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') handleSearchToggle();
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full h-16 flex items-center justify-between px-3">
        <p className="text-2xl font-bold">Операції</p>

        <div className="flex items-center shrink-0">
          <div
            className={`header-search-wrapper overflow-hidden w-0 opacity-0 p-1 ${isSearchOpen ? 'header-search-wrapper--visible' : ''}`}
          >
            <FinControlledInput
              name="search"
              ref={inputRef}
              onKeyDown={handleKeyDown}
              placeholder="Пошук..."
              showErrors={false}
            />
          </div>
          <div className="flex items-center gap-2">
            <UiIconButton
              isRoundedFull
              icon={isSearchOpen ? 'x' : 'search'}
              bgNone={true}
              variant="muted-foreground"
              size="xl"
              borderNone={true}
              onClick={handleSearchToggle}
            />

            <FiltersSheet>
              <UiIconButton
                isRoundedFull
                icon="sliders2"
                bgNone={true}
                variant="muted-foreground"
                size="xl"
                borderNone={true}
              />
            </FiltersSheet>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
