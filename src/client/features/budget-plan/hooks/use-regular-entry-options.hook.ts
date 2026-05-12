'use client';

import { useEffect, useMemo, useState } from 'react';
import { regularEntryService } from '@frontend/features/regular-incomes-expenses/regular-entry.service';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import type { DropdownOption } from '@frontend/shared/models/dropdown-option.model';

export function useRegularEntryOptions(selectedRegularIds?: number[]) {
  const [regularEntriesOptions, setRegularEntriesOptions] = useState<DropdownOption<number>[]>([]);
  const [search, setSearch] = useState('');
  const [loadingState, setLoadingState] = useState(PromiseState.Loading);

  useEffect(() => {
    let isMounted = true;

    const loadEntries = async () => {
      try {
        setLoadingState(PromiseState.Loading);
        const entries = await regularEntryService.getItems(0, 1000, { softDeleted: 0 });

        if (!isMounted) {
          return;
        }

        setRegularEntriesOptions(
          entries.map((entry) => ({
            label: entry.title,
            value: entry.id,
          })),
        );
        setLoadingState(PromiseState.Success);
      } catch {
        if (isMounted) {
          setLoadingState(PromiseState.Error);
        }
      }
    };

    void loadEntries();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedRegularEntries = useMemo(
    () => regularEntriesOptions.filter((option) => selectedRegularIds?.includes(option.value)),
    [regularEntriesOptions, selectedRegularIds],
  );

  const filteredRegularEntries = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    if (!normalized) {
      return regularEntriesOptions;
    }

    return regularEntriesOptions.filter((option) => option.label.toLowerCase().includes(normalized));
  }, [regularEntriesOptions, search]);

  return {
    search,
    setSearch,
    loadingState,
    selectedRegularEntries,
    filteredRegularEntries,
  };
}
