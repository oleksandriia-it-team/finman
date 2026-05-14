'use client';

import { useEffect, useState } from 'react';
import { regularEntryService } from '@frontend/features/regular-incomes-expenses/regular-entry.service';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import type { DropdownOption } from '@frontend/shared/models/dropdown-option.model';

export function useRegularEntryOptions() {
  const [regularEntriesOptions, setRegularEntriesOptions] = useState<DropdownOption<number>[]>([]);
  const [loadingState, setLoadingState] = useState(PromiseState.Loading);

  useEffect(() => {
    let isMounted = true;

    const loadEntries = async () => {
      try {
        setLoadingState(PromiseState.Loading);
        const entries = await regularEntryService.getItems(1, 1000, { softDeleted: 0 });

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

  return {
    loadingState,
    filteredRegularEntries: regularEntriesOptions,
  };
}
